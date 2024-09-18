const colorNames = {
	coconut: "rgba(156, 100, 72, 1)",
	coconut_1: "rgba(156, 100, 72, 0.3)",
	white: "#FFFFFF",
	black: "#000000",
	malachite: "rgba(34, 236, 34, 1)",
	grey: "rgba( 128, 128, 128, 1)",
	red: "rgba(255,34, 34, 1)",

	test: "yellow",
};

export const theme = {
	breakpoint: {
		// small: "480px",
		// medium: "767px",
		// large: "1024px",
	},
	fontWeight: {
		// regular: 400,
		// medium: 500,
		// semiBold: 600,
		// bold: 700,
	},
	breakpoints: {
		// small: 576,
		// medium: 768,
		// large: 992,
	},
	boxShadow: {
		button: "3px 3px 1px rgba(0, 0, 0, 1)",
		activeButton: "1px 1px 1px rgba(0, 0, 0, 1)",
		disabledButton: "3px 3px 1px rgba( 128, 128, 128, 1)",
	},
	colors: {
		primaryColor: colorNames.yellow,
		secondaryColor: colorNames.coconut,
		specialColor: colorNames.malachite,

		button: {
			text: colorNames.white,
			backgroundColor: colorNames.coconut,
			disabledBackgroundColor: colorNames.coconut_1,
			borderColor: colorNames.black,
			disabled: colorNames.grey,
			shotButton: colorNames.red,
		},
	},
};
