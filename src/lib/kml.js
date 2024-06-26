export const kmlString = (latitude, longitude, name) => {
    return `<?xml version="1.0" encoding="UTF-8"?>
        <kml xmlns="http://www.opengis.net/kml/2.2" xmlns:gx="http://www.google.com/kml/ext/2.2" xmlns:kml="http://www.opengis.net/kml/2.2" xmlns:atom="http://www.w3.org/2005/Atom">
        <Document>
            <StyleMap id="m_ylw-pushpin3">
                <Pair>
                    <key>normal</key>
                    <styleUrl>#s_ylw-pushpin000</styleUrl>
                </Pair>
                <Pair>
                    <key>highlight</key>
                    <styleUrl>#s_ylw-pushpin_hl000</styleUrl>
                </Pair>
            </StyleMap>
            <Style id="s_ylw-pushpin000">
                <IconStyle>
                    <scale>1.1</scale>
                    <Icon>
                        <href>http://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png</href>
                    </Icon>
                    <hotSpot x="20" y="2" xunits="pixels" yunits="pixels"/>
                </IconStyle>
            </Style>
            <Style id="s_ylw-pushpin_hl000">
                <IconStyle>
                    <scale>1.3</scale>
                    <Icon>
                        <href>http://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png</href>
                    </Icon>
                    <hotSpot x="20" y="2" xunits="pixels" yunits="pixels"/>
                </IconStyle>
            </Style>
            <Placemark>
                <name>${name}</name>
                <Camera>
                    <longitude>${longitude}</longitude>
                    <latitude>${latitude}</latitude>
                    <altitude>1000.85969769325</altitude>
                    <gx:altitudeMode>relativeToSeaFloor</gx:altitudeMode>
                </Camera>
                <styleUrl>#m_ylw-pushpin3</styleUrl>
                <Point>
                    <gx:drawOrder>1</gx:drawOrder>
                    <coordinates>${longitude},${latitude}</coordinates>
                </Point>
            </Placemark>
        </Document>
        </kml>`;
}