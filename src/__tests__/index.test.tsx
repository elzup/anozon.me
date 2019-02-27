import puppeteer from 'puppeteer'

const { LOGIN_USER, LOGIN_PASS } = process.env

const sel = (id, part = '') => `[data-test${part}="${id}"]`
const selActive = (id, part = '') => sel(id, part) + ':enabled'

// const viewDebug = false
const viewDebug = true

jest.setTimeout(100000)
let page
let browser

const host = 'http://localhost:3000'
const site = (path = '') => `${host}${path}`

function generateCounter(selector) {
	return async page => (await page.$$(selector)).length
}
function generateGetter(selector) {
	return async page => await page.$$(selector)
}

const selectorControlItems = sel('control-item-', '^')
const selectorScenarioItems = sel('scenario-item-', '^')
const selectorTriggerItems = sel('trigger-item-', '^')
const selectorEventItems = sel('event-item-', '^')

const countControl = generateCounter(selectorControlItems)
const countScenario = generateCounter(selectorScenarioItems)
const countTrigger = generateCounter(selectorTriggerItems)
const countEvent = generateCounter(selectorEventItems)

const getControls = generateGetter(selectorControlItems)
const getScenarios = generateGetter(selectorScenarioItems)
const getTriggers = generateGetter(selectorTriggerItems)
const getEvents = generateGetter(selectorEventItems)

function generateEnable(selector) {
	return async page => {
		if (viewDebug) {
			await page.waitFor(1000)
		}
		return await page.waitFor(selector, { timeout: 5000 })
	}
}

async function jv(obj, property) {
	return await (await obj.getProperty(property)).jsonValue()
}

async function gv(selector, property) {
	const l = await page.waitFor(selector)
	return await jv(l, property)
}

function gp(selector, attribute) {
	return page.$eval(
		selector,
		(el, attribute) => el.getAttribute(attribute),
		attribute
	)
}

const mock = {
	house: {
		id: '3',
	},
	controls: {
		normal: {
			name: 'Aカーテン開く',
			activePin: '1',
			negativePin: '2',
			timer: '10',
		},
		normal2: {
			name: 'Aカーテン閉じる',
			activePin: '2',
			negativePin: '1',
			timer: '10',
		},
		empty: {
			name: 'BミストON',
			activePin: '3',
			negativePin: '',
			timer: '',
		},
		empty2: {
			name: 'BミストOFF',
			activePin: '',
			negativePin: '3',
			timer: '',
		},
	},
	scenario1: {
		name: '平常日',
	},
	scenario2: {
		name: '雨の日',
	},
	triggers: {
		trigger1: {
			sensor: '2',
			rule: '<',
			sensorValue: '25',
			label: '湿度 &lt; 25%',
		},
		trigger2: {
			sensor: '2',
			rule: '>=',
			sensorValue: '30',
			label: '湿度 &gt;= 30%',
		},
		trigger3: {
			sensor: '2',
			rule: '<',
			sensorValue: '35',
			label: '湿度 &lt; 35%',
		},
		trigger4: {
			sensor: '3',
			rule: '>',
			sensorValue: '450',
			label: 'CO2 &gt; 450ppm',
		},
	},
	subControl: {
		id: '6',
		label: 'ミストON[通常]',
	},
	createEventInserted: 3,
	createEventInserted2: 3,
	createTriggerInserted: 3,
}

beforeAll(async () => {
	browser = await puppeteer.launch({ headless: !viewDebug, timeout: 0 })
	page = await browser.newPage()
	await page.goto(site(), { waitUntil: 'networkidle2' })
	await page.setViewport({ width: 1280, height: 800 })
	await page.type(sel('email'), LOGIN_USER)
	await page.type(sel('password'), LOGIN_PASS)
	await page.click(sel('login-btn'))

	await page.waitFor(sel(`house-${mock.house.id}-link`))
	await page.click(sel(`house-${mock.house.id}-link`))
})

afterAll(() => {
	browser.close()
})

describe('UI', () => {
	it('コントロールの登録', async () => {
		// in /houses/3

		const wait = generateEnable(selActive('control-submit-btn'))

		await page.click(sel('control-edit-btn'))

		// 作成
		const submitControl = async (page, control) => {
			await wait(page)
			await page.type(sel('control-input-name'), control.name)
			await page.type(sel('control-input-activePin'), control.activePin)
			await page.type(sel('control-input-negativePin'), control.negativePin)
			await page.type(sel('control-input-timer'), control.timer)
			await page.click(sel('control-submit-btn'))
		}
		await submitControl(page, mock.controls.normal2)
		await submitControl(page, mock.controls.empty)
		await submitControl(page, mock.controls.empty2)
		await submitControl(page, mock.controls.normal)

		// 作ったものの表示確認
		await wait(page)
		expect(await countControl(page)).toBe(4)

		// ソートされている
		const controls = await getControls(page)
		console.log(controls)
		expect(controls.length).toBe(4)

		expect(await jv(controls[0], 'innerHTML')).toEqual(
			expect.stringMatching(mock.controls.normal2.name)
		)
		expect(await jv(controls[1], 'innerHTML')).toEqual(
			expect.stringMatching(mock.controls.normal.name)
		)
		expect(await jv(controls[2], 'innerHTML')).toEqual(
			expect.stringMatching(mock.controls.empty2.name)
		)
		expect(await jv(controls[3], 'innerHTML')).toEqual(
			expect.stringMatching(mock.controls.empty.name)
		)
	})

	it('シナリオの登録', async () => {
		// in /houses/3

		const wait = generateEnable(selActive('create-scenario-btn'))

		// 作成
		await wait(page)
		await page.type(sel('scenario-input-name'), mock.scenario1.name)
		await page.click(sel('scenario-submit-btn'))
		await wait(page)
		await page.type(sel('scenario-input-name'), mock.scenario2.name)
		await page.click(sel('scenario-submit-btn'))
		await wait(page)

		// 作ったものの表示確認
		expect(await gv(sel(`scenario-item-0`), 'innerHTML')).toEqual(
			expect.stringMatching(mock.scenario1.name)
		)
		expect(await gv(sel(`scenario-item-1`), 'innerHTML')).toEqual(
			expect.stringMatching(mock.scenario2.name)
		)
		expect(await countScenario(page)).toBe(2)
	})

	it('トリガーの登録', async () => {
		// in /houses/3/scenarios/#
		await page.waitFor(sel('scenario-link-0'))
		await page.click(sel('scenario-link-0'))

		const wait = generateEnable(selActive('create-trigger-btn'))

		// 作成
		const submit = async (page, trigger) => {
			await wait(page)
			await page.select(sel('trigger-sensor-input'), trigger.sensor)
			await page.select(sel('trigger-rule-input'), trigger.rule)
			await page.type(sel('trigger-sensor-value-input'), trigger.sensorValue)
			await page.click(sel('create-trigger-btn'))
		}
		await submit(page, mock.triggers.trigger1)
		await submit(page, mock.triggers.trigger2)
		await submit(page, mock.triggers.trigger3)
		await submit(page, mock.triggers.trigger4)

		// 作ったものの表示確認
		await wait(page)
		expect(await gv(sel(`trigger-item-0`), 'innerHTML')).toEqual(
			expect.stringMatching(mock.triggers.trigger1.label)
		)
		expect(await gv(sel(`trigger-item-1`), 'innerHTML')).toEqual(
			expect.stringMatching(mock.triggers.trigger2.label)
		)
		expect(await gv(sel(`trigger-item-2`), 'innerHTML')).toEqual(
			expect.stringMatching(mock.triggers.trigger3.label)
		)
		expect(await gv(sel(`trigger-item-3`), 'innerHTML')).toEqual(
			expect.stringMatching(mock.triggers.trigger4.label)
		)
		expect(await countTrigger(page)).toBe(4)
	})

	it('イベントの登録', async () => {
		const wait = generateEnable(selActive('create-event-btn'))

		// イベント作成
		await wait(page)
		const triggerId = await gp(sel('event-trigger-option-1'), 'value')
		await page.select(sel('event-trigger-id-input'), triggerId)
		const subControlId = await gp(sel('event-subControl-option-1'), 'value')
		await page.select(sel('event-subControl-id-input'), subControlId)

		await page.type(sel('event-start-time-input'), '09:59')
		await page.type(sel('event-end-time-input'), '12:30')
		await page.type(sel('event-active-interval-input'), '5')
		await page.type(sel('event-negative-interval-input'), '0')
		await page.click(sel('create-event-btn'))

		// 作ったものの表示確認
		await wait(page)
		expect(await gv(sel(`event-0-trigger`), 'innerHTML')).toEqual(
			expect.stringMatching(mock.triggers.trigger1.label)
		)
		expect(await countEvent(page)).toBe(1)

		// トグル
		await wait(page)

		// const selBtn = sel(`event-toggle-btn-${eventNum1 - 1}`)
		// const btnState0 = await gp(selBtn, 'data-checked')
		// console.log(btnState0)
		//
		// await page.click(selBtn)
		// await wait(page)
		// expect(await gp(selBtn, 'data-checked')).toBe(!btnState0)
		//
		// await page.click(selBtn)
		// await wait(page)
		// expect(await gp(selBtn, 'data-checked')).toBe(btnState0)
	})

	it('削除', async () => {
		const wait = generateEnable(selActive('create-event-btn'))
		const wait2 = generateEnable(selActive('create-scenario-btn'))

		// イベント
		await page.click(sel(`event-del-btn-0`))
		await wait(page)
		expect(await countEvent(page)).toBe(0)

		// トリガー
		for (let i = 0; i < 4; i++) {
			await wait(page)
			await page.click(sel(`trigger-del-btn-0`))
		}
		await wait(page)
		expect(await countTrigger(page)).toBe(0)

		// /houses/3
		await page.waitFor(sel('back-house-link'))
		await page.click(sel('back-house-link'))

		// コントロール
		for (let i = 0; i < 4; i++) {
			await wait2(page)
			await page.click(sel(`control-del-btn-0`))
		}
		await wait2(page)
		expect(await countControl(page)).toBe(0)

		// シナリオ
		await page.click(sel(`scenario-del-btn-0`))
		await wait2(page)
		await page.click(sel(`scenario-del-btn-0`))
		await wait2(page)
		expect(await countScenario(page)).toBe(0)
	})
})
