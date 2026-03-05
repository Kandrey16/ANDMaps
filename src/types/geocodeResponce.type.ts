export type YandexGeocodeResponse = {
	response: {
		GeoObjectCollection: {
			featureMember: Array<{
				GeoObject: {
					metaDataProperty: {
						GeocoderMetaData: {
							Address: {
								Components: Array<{
									kind: string
									name: string
								}>
							}
						}
					}
				}
			}>
		}
	}
}
