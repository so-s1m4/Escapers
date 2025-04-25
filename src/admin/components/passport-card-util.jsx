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
import logo from 'img/logo.png'
import { BASE_URL } from 'utils/fetchData.ts'

// Styles for a single-page passport card
const passStyles = StyleSheet.create({
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
const formularStyles = StyleSheet.create({
	text: {
		fontSize: 11,
		marginBottom: mm2pt(3),
		textAlign: 'justify',
	},
})

export const PassportCardDocument = data => (
	<Document>
		<Page size={PageSizes.PASSPORT_CARD} style={passStyles.page}>
			<View style={passStyles.overlayContainer}>
				<Text style={passStyles.text}>{data.name}</Text>
				<Text style={passStyles.text}>{data.idNumber}</Text>
				<Text style={passStyles.text}>{data.birthDate}</Text>
			</View>
			<Image src={data.backgroundUrl} style={passStyles.background} />
		</Page>
	</Document>
)
export const FormularDocument = data => {
	return (
		<Document>
			<Page
				size={PageSizes.A4}
				style={{
					...passStyles.page,
					padding: mm2pt(20),
					paddingTop: mm2pt(10),
				}}
			>
				<Image
					src={logo}
					style={{
						height: mm2pt(15),
						width: mm2pt(40),
						alignSelf: 'center',
					}}
				/>
				<Text
					style={{
						fontSize: 12,
						marginBottom: mm2pt(4),
						textAlign: 'center',
						fontWeight: 'bold',
					}}
				>
					Einverständniserklärung für die Teilnahme an einem Spiel oder Quest
				</Text>
				<View
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						flexDirection: 'row',
						gap: mm2pt(10),
						marginBottom: mm2pt(4),
						width: '100%',
					}}
				>
					<Text
						style={{
							fontSize: 12,
							marginBottom: mm2pt(4),
							textAlign: 'center',
							fontWeight: 'bold',
						}}
					>
						Sankt Pölten
					</Text>

					<Text
						style={{
							fontSize: 12,
							marginBottom: mm2pt(4),
							textAlign: 'center',
							fontWeight: 'bold',
						}}
					>
						Datum "
						{new Date(data.createdAt).toLocaleDateString('ua-UA', {
							day: 'numeric',
						})}
						"{' '}
						{new Date(data.createdAt).toLocaleDateString('ua-UA', {
							month: 'long',
						})}{' '}
						{new Date(data.createdAt).toLocaleDateString('ua-UA', {
							year: 'numeric',
						})}{' '}
					</Text>
				</View>
				<Text style={formularStyles.text}>
					Wir bitten Sie um die Bereitstellung von Dienstleistungen für die
					Durchführung eines Spiels (Real-Life-Quests), einschlislich der
					Möglichkeit, Ausrüstung für einen vernünftigen Freizeitgebrauch zu
					mieten. Wir äußern den Wunsch, an dem Spiel/Quest (im Folgenden als
					„Spiel“ genannt) teilzunehmen und unterschreiben diese Einwilligung
					auf freiwilliger Basis. Wir, Unterzeichneten, erkennen an, und stimmen
					in unserem Namen dem Folgenden(in unserem eigenen Namen) zu:
				</Text>
				<Text style={formularStyles.text}>
					1. Bei der Buchung eines Spiels auf der Seite https://escapers.at
					selbst oder mit Hilfe eines Fachberaters unter der Telefonnummer: +43
					676 9101254 habe ich mich mit den Spielregeln vertraut gemacht, die
					Regeln für die Erbringung von Dienstleistungen auf der Website unter
					der Webadresse: https://escapers.at. Ich stimme den Regeln voll und
					ganz zu, habe keine Einwände, verstehe und akzeptiere die Regeln.
				</Text>
				<Text style={formularStyles.text}>
					2. Vor der Buchung einer Sitzung habe ich die auf der Website
					präsentierte Nutzungsvereinbarung gelesen und akzeptiert, die sich
					unter der Webadresse der Internetressource befindet:
					https://escapers.at. Ich akzeptiere die Vereinbarung zum öffentlichen
					Angebot
				</Text>
				<Text style={formularStyles.text}>
					3. Ich verstehe, dass dieses Spiel das Vorhandensein von Risiken
					verschiedener Verletzungen aufgrund von Fahrlässigkeit beinhaltet.
					Obwohl die Einhaltung bestimmter Spielregeln, Sicherheitsregeln,
					technischer Vorschriften, der Verwendung spezieller Ausrüstung und der
					persönlichen Disziplin diese Risiken verringern kann, bleibt das
					Risiko schwerer Verletzungen bestehen. Mir ist bewusst, dass es sich
					bei den Unterhaltungsangeboten der Internetressource: Escapers GmbH um
					Spiele handelt, die zu Verletzungen führen können
				</Text>
				<Text style={formularStyles.text}>
					4. Ich übernehme wissentlich und freiwillig die Verantwortung für
					diese Risiken - sowohl bekannte als auch unbekannte, einschließlich
					Risiken, die sich aus der Fahrlässigkeit der Veranstalter,
					Ausführenden oder anderer Personen ergeben, übernehme ich die volle
					Verantwortung für meine Teilnahme an der Games Escapers GmbH. Sollte
					ich jedoch während meiner Anwesenheit oder Teilnahme an den Spielen
					eine nicht übliche oder erhebliche Gefahr für Leben oder
					Körperverletzung feststellen, verpflichte ich mich, meine Teilnahme am
					Spiel einzustellen und den Veranstalter und Ausführenden des
					Ereignisses einer solchen Bedrohung unverzüglich mündlich zu
					unterrichten, oder per Telefonverbindung.
				</Text>
				<Text style={formularStyles.text}>
					5. Ich stimme freiwillig zu, alle allgemein anerkannten Anforderungen
					und Bedingungen für die Teilnahme an diesem Spiel einzuhalten.
				</Text>
				<Text style={formularStyles.text}>
					6. Im Falle von Verletzungen oder Todesfällen entbinde ich hiermit in
					meinem eigenen Namen und im Namen meiner Erben, Rechtsnachfolger oder
					Vertreter und Angehörigen von der Haftung und Verfolgung der
					Veranstalter der Spiel Escapers GmbH, Administratoren, andere
					Darsteller und Freizeitaktivitäten.
				</Text>
				<Text style={formularStyles.text}>
					7. Durch diese Vereinbarung erteile ich mein Einverständnis gegenüber
					den Veranstaltern des Spiels zur Verarbeitung personenbezogener Daten,
					für Videoaufnahmen, Fotografieren und Aufnahmen meiner Stimme im
					laufenden Spiel, sowie der Nutzung meiner Fotografien,
					Scherenschnittbilder und andere Materialien, die die Reproduktion
					meines Aussehens und meiner Stimme beinhalten, für Marketingzwecke als
					Teil der Werbung, um das Ziel anzusprechen Publikum, sowie zur Vorlage
					an Strafverfolgungsbehörden im Falle eines Verstoßes gegen
					österreichisches Recht.
				</Text>
				<Text style={formularStyles.text}>
					8. Ich verstehe, dass Personen mit Krankheiten wie: Geistesstörung,
					Herzkrankheit, Atemwegserkrankungen, Asthma, Epilepsie oder anderen
					Krankheiten, die eine Verschlechterung der Gesundheit verursachen und
					zu Komplikationen der Krankheit oder sogar zum Tod führen können,
					nicht spielen dürfen. Durch diese Vereinbarung bestätige ich, dass ich
					NICHT an den oben genannten Krankheiten und anderen Krankheiten leide,
					die während/nach dem Spiel gesundheitliche Komplikationen verursachen
					oder sogar zum Tod führen können.
				</Text>
			</Page>
			<Page
				size={PageSizes.A4}
				style={{
					...passStyles.page,
					padding: mm2pt(20),
					paddingTop: mm2pt(10),
				}}
			>
				<Text style={formularStyles.text}>
					9. Während, vor oder nach dem Spiel verpflichte ich mich, vorsätzlich
					oder nicht vorsätzlich die Spielrequisiten und jegliches Eigentum des
					Spiels Veranstalters oder der Escapers GmbH nicht zu beschädigen.
				</Text>
				<Text style={formularStyles.text}>
					10. Im Falle eines Verstoßes gegen Ziffer 9 dieser Vereinbarung
					verpflichte ich mich, den durch meine Handlungen/Unterlassungen
					verursachten Schaden. Es ist mir klar, dass ich in meinem eigenen
					Namen alle Risiken und Verantwortlichkeiten übernehme, wenn ich diese
					Dienstleistungen erbringe.
				</Text>
				<Text style={formularStyles.text}>
					11. Ich verstehe und akzeptiere die folgenden Einschränkungen für die
					Teilnahme an Virtual-Reality-Spielen: Wir bitten Sie, besonders auf
					die folgenden Einschränkungen zu achten! Die Teilnahme an Spielen in
					der virtuellen Realität wird Menschen mit epileptischen Anfällen und
					anderen Anfällen nicht empfohlen. Das Mindestalter für die Teilnahme
					an Spielen beträgt 13 Jahre (in Anwesenheit der Eltern). Einige Spiele
					enthalten beängstigende Szenen und Klänge und können
					Altersbeschränkungen haben. Eltern sind verpflichtet, das Wohlbefinden
					ihrer Kinder während des Spiels zu überwachen und das Spiel zu
					stoppen, wenn sich der Zustand des Kindes verschlechtert. Einige
					Spielelemente beinhalten farbliche Unterscheidungen, daher können
					Menschen mit Farbenblindheit erhebliche Schwierigkeiten beim Spielen
					haben. Der in dem Spiel verwendete Ton ist auf 93 Dezibel begrenzt.
					Wenn Sie während des Spiels Unbehagen aufgrund von Geräuschen oder
					anderer Umstände verspüren, sind Sie verpflichtet, dies dem Betreiber
					sofort mitzuteilen.
				</Text>
				<Text style={formularStyles.text}>
					Ich ermächtige die Escapers GmbH, meine personenbezogenen Daten zu
					erheben, zu speichern, zu verarbeiten und zu nutzen, um die
					Kommunikation aufrechtzuerhalten, Anrufe auf meiner Telefonnummer
					durchzuführen, SMS-Benachrichtigungen über laufende Werbeaktionen,
					Veranstaltungen, Rabatte, deren Ergebnisse sowie zur Durchführung von
					Korrespondenz und Umfragen. Ich bestätige dadurch, dass die
					bereitgestellten personenbezogenen Daten wissentlich und freiwillig
					waren.
				</Text>
				<Text style={formularStyles.text}>Wir als Teil des Teams:</Text>

				{data.clients.map((client, index) => (
					<View>
						<View
							style={{
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'flex-start',
								position: 'relative',
								paddingLeft: mm2pt(20),
							}}
							key={index}
						>
							<Text
								style={{
									...formularStyles.text,
									width: '100%',
									color: 'blue',
								}}
							>
								{client.firstName} {client.lastName}{' '}
								{new Date(client.birthday).toLocaleDateString('ua-UA')}
							</Text>
							<Image
								src={
									BASE_URL + '/public/' + client.RoomsClients.clientSignature
								}
								style={{
									width: mm2pt(30),
									height: mm2pt(20),
									objectFit: 'cover',
									objectPosition: 'center',
									position: 'absolute',
									left: 0,
									bottom: -10,
									zIndex: 2,
								}}
							/>
						</View>
						<Text style={{ ...formularStyles.text }}>
							(Unterschrift, vollständiger Name, Geburtsdatum, Telefonnummer)
						</Text>
					</View>
				))}

				{Array(8 - data.clients.length)
					.fill(
						<>
							<Text style={formularStyles.text}>{'_'.repeat(80)}</Text>
							<Text style={{ ...formularStyles.text }}>
								(Unterschrift, vollständiger Name, Geburtsdatum, Telefonnummer)
							</Text>
						</>
					)
					.map((item, index) => {
						return item
					})}
				<Text style={formularStyles.text}>
					Bei minderjährigen Teilnehmern (unter 16 Jahren zum Zeitpunkt des
					Spiels) kommt der Vertrag nach österreichischem Recht durch die Eltern
					/ Bevollmächtigten / Erziehungsberechtigten / Verantwortlichen des
					Teilnehmers zustande.
				</Text>
				<Text style={formularStyles.text}>
					Escapers GmbH als Ganzes sowie deren leitenden Angestellten,
					Vertretern und/oder Mitarbeitern, anderen Mitgliedern, Geldgebern,
					Sponsoren, Werbetreibenden und gegebenenfalls den Eigentümern und
					Vermietern der Räumlichkeiten, in denen die Veranstaltungen
					stattfinden.
				</Text>
			</Page>
		</Document>
	)
}
