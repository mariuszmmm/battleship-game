const colorNames = {
	white: "rgba(255, 255, 255, 1)",
	emperor: "rgba( 80, 80, 80, 1)",
	semiTransparent: "rgba(0, 0, 0, 0.8)",
	black: "rgba(0, 0, 0, 1)",
	coconut: "rgba(156, 100, 72, 1)",
	coconut_1: "rgba(156, 100, 72, 0.3)",
	malachite: "rgba(34, 240, 34, 1)",
	torchRed: "rgba(255,34, 34, 1)",
	red: "rgba(255, 0, 0, 1)",
	spicy: "rgba(140, 90, 65, 1)",
	green: "rgba(0, 255, 0, 1)",

	test: "yellow",
};

export const theme = {
	breakpoints: {
		// small: "480px",
		medium: "700px",
		big: "900px",
		// large: "1024px",
	},
	fontWeight: {
		// regular: 400,
		medium: 500,
		// semiBold: 600,
	},
	boxShadow: {
		button: `3px 3px 1px ${colorNames.black}`,
		activeButton: `1px 1px 1px ${colorNames.black}`,
		disabledButton: `3px 3px 1px  ${colorNames.emperor}`,
	},
	colors: {
		primaryColor: colorNames.black,
		secondaryColor: colorNames.coconut,
		specialColor: colorNames.malachite,
		backgroundColor: colorNames.emperor,
		textColor: colorNames.white,
		semiTransparent: colorNames.semiTransparent,

		button: {
			textColor: colorNames.white,
			backgroundColor: colorNames.coconut,
			disabledBackgroundColor: colorNames.coconut_1,
			hoveredBackgroundColor: colorNames.spicy,
			activeBackgroundColor: colorNames.malachite,
			activeSpecialBackgroundColor: colorNames.green,
			activeSpecialColor: colorNames.black,
			borderColor: colorNames.black,
			disabled: colorNames.emperor,
			shotBackgroundColor: colorNames.torchRed,
			hoveredShotBackgroundColor: colorNames.red,
		},
	},
};
