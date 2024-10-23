declare module '*.svg' {
	import React = require('react');

	export const ReactComponent: REact.FC<React.SVGProps<SVGSVGElement>>;
}

declare module '*.png' {
	const value: string;

	export default value;
}

declare module '*.jpg' {
	const value: string;
	export default value;
}

declare module '*.mp3' {
	const value: string;
	export default value;
}