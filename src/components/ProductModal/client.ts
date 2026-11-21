// 作品カード → 詳細モーダルの開閉と画像送り。
// View Transitions が使えるときはカードの媒体をモーダルの画像へモーフさせる

const HERO_NAME = 'pm-hero'
const PANEL_NAME = 'pm-panel'
// 画像のデコードを待つ上限。これを超えたら未デコードのまま遷移する (クリックの反応を遅らせないため)
const DECODE_WAIT_MS = 120

type StartViewTransition = (update: () => Promise<void> | void) => { finished: Promise<void> }

const startViewTransition: StartViewTransition | undefined =
	typeof document.startViewTransition === 'function'
		? (update) => document.startViewTransition(update)
		: undefined

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const waitDecoded = (img: HTMLImageElement | null) =>
	img ? Promise.race([img.decode().catch(() => undefined), sleep(DECODE_WAIT_MS)]) : Promise.resolve()

const slidesOf = (dialog: HTMLDialogElement) => [...dialog.querySelectorAll<HTMLElement>('[data-pm-slide]')]

const currentIndex = (dialog: HTMLDialogElement) => {
	const track = dialog.querySelector<HTMLElement>('[data-pm-track]')
	return track ? Math.round(track.scrollLeft / Math.max(track.clientWidth, 1)) : 0
}

const setName = (el: HTMLElement | null | undefined, name: string) => {
	if (el) el.style.viewTransitionName = name
}

/** VT 中は dialog 自身の CSS 遷移を止める (二重に動くとカクつく) */
const withTransition = async (update: () => Promise<void> | void) => {
	if (!startViewTransition) {
		await update()
		return
	}
	document.documentElement.classList.add('pm-vt')
	try {
		await startViewTransition(update).finished
	} finally {
		document.documentElement.classList.remove('pm-vt')
	}
}

const eagerLoad = (dialog: HTMLDialogElement) => {
	dialog.querySelectorAll<HTMLImageElement>('img[loading="lazy"]').forEach((img) => {
		img.loading = 'eager'
	})
}

const openModal = async (card: HTMLElement, dialog: HTMLDialogElement) => {
	const media = card.querySelector<HTMLElement>('.card .media')
	const hero = slidesOf(dialog)[0]
	eagerLoad(dialog)
	setName(media, HERO_NAME)
	await withTransition(async () => {
		setName(media, '')
		setName(hero, HERO_NAME)
		setName(dialog, PANEL_NAME)
		dialog.showModal()
		dialog.querySelector<HTMLElement>('[data-pm-track]')?.scrollTo({ left: 0 })
		await waitDecoded(hero?.querySelector('img') ?? null)
	})
	setName(hero, '')
	setName(dialog, '')
}

const closeModal = async (dialog: HTMLDialogElement) => {
	const card = document.querySelector<HTMLElement>(`[data-pm-target="${dialog.id}"]`)
	const media = card?.querySelector<HTMLElement>('.card .media')
	const hero = slidesOf(dialog)[currentIndex(dialog)]
	setName(hero, HERO_NAME)
	setName(dialog, PANEL_NAME)
	await withTransition(() => {
		setName(hero, '')
		setName(dialog, '')
		setName(media, HERO_NAME)
		dialog.close()
	})
	setName(media, '')
}

const setupCarousel = (dialog: HTMLDialogElement) => {
	const track = dialog.querySelector<HTMLElement>('[data-pm-track]')
	if (!track) return
	const prev = dialog.querySelector<HTMLButtonElement>('[data-pm-prev]')
	const next = dialog.querySelector<HTMLButtonElement>('[data-pm-next]')
	const thumbs = [...dialog.querySelectorAll<HTMLButtonElement>('[data-pm-thumb]')]
	const counter = dialog.querySelector<HTMLElement>('[data-pm-count]')
	const count = slidesOf(dialog).length

	const goTo = (index: number) => {
		const clamped = Math.min(Math.max(index, 0), count - 1)
		track.scrollTo({ left: clamped * track.clientWidth, behavior: 'smooth' })
	}

	let frame = 0
	const sync = () => {
		const index = currentIndex(dialog)
		thumbs.forEach((thumb, i) => thumb.setAttribute('aria-current', String(i === index)))
		if (counter) counter.textContent = `${index + 1} / ${count}`
		if (prev) prev.disabled = index === 0
		if (next) next.disabled = index === count - 1
	}
	track.addEventListener(
		'scroll',
		() => {
			cancelAnimationFrame(frame)
			frame = requestAnimationFrame(sync)
		},
		{ passive: true }
	)
	sync()

	prev?.addEventListener('click', () => goTo(currentIndex(dialog) - 1))
	next?.addEventListener('click', () => goTo(currentIndex(dialog) + 1))
	thumbs.forEach((thumb, i) => thumb.addEventListener('click', () => goTo(i)))
	dialog.addEventListener('keydown', (event) => {
		if (event.key === 'ArrowLeft') goTo(currentIndex(dialog) - 1)
		if (event.key === 'ArrowRight') goTo(currentIndex(dialog) + 1)
	})
}

// 文言を一時的に変えて結果を伝える長さ。短いと読めず、長いと次のコピーを妨げる
const COPY_FEEDBACK_MS = 1600

const setupCopy = (dialog: HTMLDialogElement) => {
	dialog.querySelectorAll<HTMLButtonElement>('[data-pm-copy]').forEach((button) => {
		const label = button.textContent
		button.addEventListener('click', async () => {
			try {
				await navigator.clipboard.writeText(button.dataset.pmCopy ?? '')
				button.textContent = 'コピーしました'
			} catch (error) {
				console.error('install コマンドのコピーに失敗', error)
				button.textContent = 'コピーできません'
			}
			setTimeout(() => {
				button.textContent = label
			}, COPY_FEEDBACK_MS)
		})
	})
}

const isModifiedClick = (event: MouseEvent) =>
	event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey

export const setupProductModals = () => {
	document.querySelectorAll<HTMLElement>('[data-pm-target]').forEach((card) => {
		const dialog = document.getElementById(card.dataset.pmTarget ?? '')
		if (!(dialog instanceof HTMLDialogElement)) return
		const link = card.querySelector<HTMLAnchorElement>('.card-link')

		// 新規タブで開きたいときの修飾クリックは素のリンクとして通す
		link?.addEventListener('click', (event) => {
			if (isModifiedClick(event)) return
			event.preventDefault()
			void openModal(card, dialog)
		})
		// ポインタが乗った時点で画像を読み始め、開いた瞬間に空のスライドが見えないようにする
		card.addEventListener('pointerenter', () => eagerLoad(dialog), { once: true })

		dialog.querySelector('[data-pm-close]')?.addEventListener('click', () => void closeModal(dialog))
		// Esc はブラウザ既定だと即 close されアニメが飛ぶので、こちらで閉じる
		dialog.addEventListener('cancel', (event) => {
			event.preventDefault()
			void closeModal(dialog)
		})
		// dialog の外側 (::backdrop) のクリックは target が dialog 自身になる
		dialog.addEventListener('click', (event) => {
			if (event.target === dialog) void closeModal(dialog)
		})
		setupCopy(dialog)
		setupCarousel(dialog)
	})
}
