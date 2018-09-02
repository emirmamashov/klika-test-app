const apiUrl = 'http://localhost:3003';
export const Config = {
    ApiRoutes: {
        songs: {
            method: 'GET',
            url: apiUrl + '/songs'
        },
        executers: {
            method: 'GET',
            url: apiUrl + '/songs/executers'
        },
        genres: {
            method: 'GET',
            url: apiUrl + '/songs/genres'
        }
    },
    Years: [1990,1992,1989,1998,1997]
}