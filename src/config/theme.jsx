const colorNames = {
	white: "rgba(255, 255, 255, 1)",
	emperor: "rgba( 80, 80, 80, 1)",
	semiTransparent: "rgba(0, 0, 0, 0.2)",
	black: "rgba(0, 0, 0, 1)",
	coconut: "rgba(156, 100, 72, 1)",
	sandal: "rgba(168, 128, 108, 1)",
	negroni: "rgba(255, 228, 196, 1)",
	malachite: "rgba(34, 240, 34, 1)",
	green: "rgba(0, 255, 0, 1)",
	torchRed: "rgba(255,34, 34, 1)",
	red: "rgba(255, 0, 0, 1)",
	blue: "rgba(36, 36, 254, 1)",
	spicy: "rgba(140, 90, 65, 1)",
};

export const theme = {
	breakpoints: {
		small: "380px",
		medium: "700px",
		big: "900px",
		large: "1200px",
	},
	fontWeight: {
		medium: 500,
	},
	boxShadow: {
		button: `3px 3px 1px ${colorNames.black}`,
		activeButton: `1px 1px 1px ${colorNames.black}`,
		disabledButton: `3px 3px 1px  ${colorNames.emperor}`,
		container: `2px 2px 10px ${colorNames.black}`,
	},
	colors: {
		primaryColor: colorNames.black,
		secondaryColor: colorNames.coconut,
		tertiaryColor: colorNames.blue,
		specialColor: colorNames.malachite,
		specialColor_2: colorNames.red,
		backgroundColor: colorNames.emperor,
		backgroundColor_2: colorNames.negroni,
		textColor: colorNames.white,
		semiTransparent: colorNames.semiTransparent,
		button: {
			textColor: colorNames.white,
			backgroundColor: colorNames.coconut,
			disabledBackgroundColor: colorNames.sandal,
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