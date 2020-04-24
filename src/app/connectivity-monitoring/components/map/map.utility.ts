
export class MapUtility {

    static ddToDms(lat: number, lng: number): string {

        let latResult: string;
        let lngResult: string;
        let dmsResult: string;
        latResult = (lat >= 0) ? 'N' : 'S';
        lngResult = (lng >= 0) ? 'E' : 'W';

        // Joining both variables and separate them with a space.
        dmsResult = 'Lat  ' + this.getDms(lat).latLong + latResult + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Long  ' + this.getDms(lng).latLong + lngResult;

        // Return the resultant string
        return dmsResult;
    }

    static getDms(latlang: number): { latLong: string, courseDegree: number, latLongSeconds: string } {

        const dmsObject: { latLong: string, courseDegree: number, latLongSeconds: string } = {
            latLong: '',
            courseDegree: 0,
            latLongSeconds: ''
        };

        let courseDegree: string | number;
        let min: string | number;
        let latLongValue: string;
        let latLongSecondsValue: string;
        let seconds: number;
        latlang = Math.abs(latlang);

        courseDegree = Math.floor(latlang);
        latLongValue = courseDegree + '°';

        min = Math.floor((latlang - courseDegree) * 60);
        latLongValue += min + '\'';

        latLongSecondsValue = latLongValue;

        seconds = Math.round((latlang - courseDegree - min / 60) * 3600 * 1000) / 1000;
        latLongSecondsValue += seconds + '"';

        dmsObject.latLong = latLongValue;
        dmsObject.courseDegree = courseDegree;
        dmsObject.latLongSeconds = latLongSecondsValue;
        return dmsObject;
    }
}
