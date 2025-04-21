import React from 'react'
import {
	Document,
	Page,
	Image,
	View,
	Text,
	StyleSheet,
} from '@react-pdf/renderer'
import { PageSizes, mm2pt } from './react-pdf-page-utils'

// Styles for a single-page passport card
const styles = StyleSheet.create({
	page: {
		padding: 0,
		margin: 0,
		position: 'relative',
		width: '100%',
		height: '100%',
	},
	background: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		objectFit: 'cover',
		zIndex: -1,
	},
	overlayContainer: {
		position: 'absolute',
		top: mm2pt(24),
		left: mm2pt(38),
	},
	text: {
		fontSize: 12,
		color: '#2a87bd',
		fontWeight: 'bold',
		marginBottom: mm2pt(4),
	},
})



export const PassportCardDocument = data => (
	<Document>
		<Page size={PageSizes.PASSPORT_CARD} style={styles.page}>
			<View style={styles.overlayContainer}>
				<Text style={styles.text}>{data.name}</Text>
				<Text style={styles.text}>{data.idNumber}</Text>
				<Text style={styles.text}>{data.birthDate}</Text>
			</View>
			<Image src={data.backgroundUrl} style={styles.background} />
		</Page>
	</Document>
)
