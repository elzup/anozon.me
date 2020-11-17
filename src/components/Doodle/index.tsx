import { cssDoodle } from '../../utils'

export const DoodleBackground = cssDoodle`
  :doodle {
		@grid: 24x12;
		width: 100vw;
		height: 200vw;
  }
  color: #ddd;
  clip-path: polygon(@pick(
    '0 0, 100% 0, 100% 100%',
    '0 0, 0 100%, 100% 100%',
    '0 0, 100% 0, 0 100%, ',
    '0 0, 0 0, 0 0',
  ));

  background: hsl(0, 0%, calc(95% + @abs(@row() / @size-row() - 0.5) * 10%));

	margin: -.5px;

	// transition: all 3s;
  // transition-timing: ease-in-out;

  :hover { 
		// transform: rotate(90deg);
		// transform: rotate(1080deg);
  	// clip-path: none;
	}
  
  :after {
    content: '\\@hex(@rand(0x250C, 0x254B))';
    font-size: 8vmax;
    color: white;
  }
`

export const DoodleBackgroundFooter = cssDoodle`
  :doodle {
		@grid: 5x9;
		width: 100%;
		height: 10em;
		z-index: 1;
		position: absolute;
	}

	color: #ddd;
	margin: 4px;


	--d: 5;
	--r: 3;
	--num: calc(
		@abs(@abs(@row() - 3) + @abs(@col() - 3) - 5) / 5
	);
	
	background: hsla(
		0, 0%, 100%, calc(var(--num) / 5)
	);

  :hover { 
		transform: rotate(90deg);
	}
`
