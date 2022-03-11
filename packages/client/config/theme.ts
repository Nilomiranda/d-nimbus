import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
	config: {
		initialColorMode: 'light',
	},
	components: {
		Button: {
			defaultProps: {
				colorScheme: 'purple',
			},
		},
	},
})
