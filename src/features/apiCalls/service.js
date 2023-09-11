const axios = require('axios');
const { Fixture, HeadToHeadFixture, Transfer, Standings, Leagues } = require('./model');

const getAllLiveFixturesApiCall = async () => {
    const options = {
        headers: {
            'x-rapidapi-key': process.env.APIKEY
        }
    };

    const url = `${process.env.FOOTBALLBaseURL}/fixtures?live=all`;
    const response = await axios.get(url, options);

    if (response.status === 200) {
        if (response.data.response.length === 0) {
            return {
                data: [],
                message: 'No live fixtures found in the API response'
            };
        }

        try {
            await Fixture.deleteMany();
            const fixture = new Fixture({
                fixtures: response.data.response
            });
            const savedFixture = await fixture.save();
            return {
                data: savedFixture,
                message: `Live fixtures ${response.data.response.length} saved successfully`
            };
        } catch (error) {
            throw new Error(error);
        }
    }
};

const getAllHeadToHeadFixturesApiCall = async () => {
    console.log('I was called')
    const options = {
        headers: {
            'x-rapidapi-key': process.env.APIKEY
        }
    };

    const url = `${process.env.FOOTBALLBaseURL}/fixtures/headtohead?h2h=33-34`;
    const response = await axios.get(url, options);

    if (response.status === 200) {
        const fixturesData = response.data.response;

        if (fixturesData.length === 0) {
            return {
                data: [],
                message: 'No fixtures found in the API response'
            };
        }

        try {
            await HeadToHeadFixture.deleteMany();

            const savedFixtures = [];

            for (let i = 0; i < fixturesData.length; i++) {
                const fixtureData = fixturesData[i];

                const fixture = new HeadToHeadFixture({
                    fixtures: fixtureData.fixture,
                    league: fixtureData.league,
                    teams: fixtureData.teams,
                    goals: fixtureData.goals,
                    score: fixtureData.score
                });

                const savedFixture = await fixture.save();

                savedFixtures.push(savedFixture);

                if (i !== fixturesData.length - 1) {
                    console.log('Processing next fixture...');
                }
            }

            return {
                data: savedFixtures,
                message: `Head to head fixtures ${savedFixtures.length} saved successfully`
            };
        } catch (error) {
            throw new Error(error);
        }
    } else {
        return {
            data: [],
            message: 'Network error'
        };
    }
};

const getAllTransfersApiCall = async () => {
    const options = {
        headers: {
            'x-rapidapi-key': process.env.APIKEY
        }
    };

    const url = `${process.env.FOOTBALLBaseURL}/transfers?player=35845`;
    const response = await axios.get(url, options);

    if (response.status === 200) {
        const transfersDataArr = response.data.response;

        if (transfersDataArr.length === 0) {
            return {
                data: [],
                message: 'No transfers found in the API response'
            };
        }

        try {
            await Transfer.deleteMany();

            const transfersArr = [];

            for (const transfersData of transfersDataArr) {
                const transferArr = transfersData.transfers;

                if (transferArr.length === 0) {
                    continue;
                }

                for (const transferItem of transferArr) {
                    const transfer = new Transfer({
                        transfer: transferItem
                    });

                    const savedTransfer = await transfer.save();
                    transfersArr.push(savedTransfer);
                }
            }

            return {
                data: transfersArr,
                message: `Transfers ${transfersArr.length} saved successfully`
            };
        } catch (error) {
            throw new Error(error);
        }
    }
}



const getAllStandingsApiCall = async (request) => {
    const { league, season } = request;
    
    const options = {
        headers: {
            'x-rapidapi-key': process.env.APIKEY
        }
    };

    const url = `${process.env.FOOTBALLBaseURL}/standings?league=${league}&season=${season}`;
    const response = await axios.get(url, options);
    const standingApiRes = response.data.response;

    if (response.status === 200 && Array.isArray(standingApiRes) && standingApiRes.length > 0) {
        try {
            await Standings.deleteMany({});
            
            const standingsArr = [];

            for (const leagueData of standingApiRes) {
                const leagueInfo = leagueData.league;
                if (Array.isArray(leagueInfo.standings) && leagueInfo.standings.length > 0) {
                    for (const standingItem of leagueInfo.standings) {
                        const standingData = new Standings({
                            standing: standingItem
                        });
                        const savedStandings = await standingData.save();
                        standingsArr.push(savedStandings);
                    }
                } else {
                    console.log('Standings is Empty');
                }
            }
            
            return {
                data: standingsArr,
                message: 'Standings fetched successfully and replaced in the database'
            };
        } catch (error) {
            console.error('Error saving standings:', error);
            return {
                data: [],
                message: 'Error occurred while saving standings'
            };
        }
    } else {
        return {
            data: [],
            message: 'No valid standings data in the API response'
        };
    }
};


const getAllLeaguesApiCall = async (request) => {
    const { leagueName } = request;
    const name = leagueName.toLowerCase()
    const options = {
        headers: {
            'x-rapidapi-key': process.env.APIKEY
        }
    };

    const url = `${process.env.FOOTBALLBaseURL}/leagues?name=${name}`;
    const response = await axios.get(url, options);

    const leagueApiRes = response.data.response

    if(response.status === 200 && Array.isArray(leagueApiRes) && leagueApiRes.length > 0){
        try {
            const leagueArr = []
            for(let leagueData of leagueApiRes){
                const league = new Leagues({
                    leagueId: leagueData.league.id,
                    leagueName: leagueData.league.name,
                    leagueType: leagueData.league.type,
                    leagueLogo: leagueData.league.logo,
                    countryName: leagueData.country.name,
                    countryFlag: leagueData.country.flag,
                    season: leagueData.seasons
                })
                const savedLeague = await league.save();
                leagueArr.push(savedLeague)
            }
            return {
                data: leagueArr,
                message: `Leagues ${response.data.response.length} saved successfully`
            }
        } catch (error) {
            throw new Error(error)
        }
    }else {
        return {
            data: [],
            message: 'No valid league data in the API response'
        };
    }
  
}

const getAllLeagueSeasonApiCall = async (request) => {
    const { league, season } = request;
    const options = {
        headers: {
            'x-rapidapi-key': process.env.APIKEY
        }
    };

    const url = `${process.env.FOOTBALLBaseURL}leagues/seasons`;
    const response = await axios.get(url, options);

    if(response.status === 200){
        console.log('fixture api response --> ', response.data);
        try {
            const fixture = new Fixture({
                fixtures: response.data.response
            })
            const savedFixture = await fixture.save();
            return {
                data: savedFixture,
                message: `Live fixtures ${response.data.response.length} saved successfully`
            }
        } catch (error) {
            throw new Error(error)
        }
    }
  
}

const getAllOddLiveApiCall = async (request) => {
    const { bet, league } = request;
    const options = {
        headers: {
            'x-rapidapi-key': process.env.APIKEY
        }
    };

    const url = `${process.env.FOOTBALLBaseURL}/odds/live?bet=${bet}?league=${league}`;
    const response = await axios.get(url, options);

    if(response.status === 200){
        console.log('fixture api response --> ', response.data);
        try {
            const fixture = new Fixture({
                fixtures: response.data.response
            })
            const savedFixture = await fixture.save();
            return {
                data: savedFixture,
                message: `Live fixtures ${response.data.response.length} saved successfully`
            }
        } catch (error) {
            throw new Error(error)
        }
    }
  
}

const getAllOddLiveBetsApiCall = async () => {
    const options = {
        headers: {
            'x-rapidapi-key': process.env.APIKEY
        }
    };

    const url = `${process.env.FOOTBALLBaseURL}/odds/live/bets`;
    const response = await axios.get(url, options);

    if(response.status === 200){
        console.log('fixture api response --> ', response.data);
        try {
            const fixture = new Fixture({
                fixtures: response.data.response
            })
            const savedFixture = await fixture.save();
            return {
                data: savedFixture,
                message: `Live fixtures ${response.data.response.length} saved successfully`
            }
        } catch (error) {
            throw new Error(error)
        }
    }
  
}

// Pre Match
const getAllOddApiCall = async (request) => {
    const {season, bet, bookmaker, fixture, league} = request
    /*
  url: 'https://v3.football.api-sports.io/odds',
  qs: {season: '2019', bet: '1', bookmaker: '6', fixture: '157140', league: '39'},
  
    */
    const options = {
        headers: {
            'x-rapidapi-key': process.env.APIKEY
        }
    };

    const url = `${process.env.FOOTBALLBaseURL}/odds?league=39&season=2019&fixture=157140&bookmaker=6&bet=1`;
    const response = await axios.get(url, options);

    if(response.status === 200){
        console.log('fixture api response --> ', response.data);
        try {
            const fixture = new Fixture({
                fixtures: response.data.response
            })
            const savedFixture = await fixture.save();
            return {
                data: savedFixture,
                message: `Live fixtures ${response.data.response.length} saved successfully`
            }
        } catch (error) {
            throw new Error(error)
        }
    }
  
}

const getAllMappingApiCall = async () => {
    const options = {
        headers: {
            'x-rapidapi-key': process.env.APIKEY
        }
    };

    const url = `${process.env.FOOTBALLBaseURL}/odds/mapping`;
    const response = await axios.get(url, options);

    if(response.status === 200){
        console.log('fixture api response --> ', response.data);
        try {
            const fixture = new Fixture({
                fixtures: response.data.response
            })
            const savedFixture = await fixture.save();
            return {
                data: savedFixture,
                message: `Live fixtures ${response.data.response.length} saved successfully`
            }
        } catch (error) {
            throw new Error(error)
        }
    }
  
}

const getAllBookMakingApiCall = async () => {
    const options = {
        headers: {
            'x-rapidapi-key': process.env.APIKEY
        }
    };

    const url = `${process.env.FOOTBALLBaseURL}/odds/bookmakers`;
    const response = await axios.get(url, options);

    if(response.status === 200){
        console.log('fixture api response --> ', response.data);
        try {
            const fixture = new Fixture({
                fixtures: response.data.response
            })
            const savedFixture = await fixture.save();
            return {
                data: savedFixture,
                message: `Live fixtures ${response.data.response.length} saved successfully`
            }
        } catch (error) {
            throw new Error(error)
        }
    }
  
}

const getAllOddBetsApiCall = async () => {
    const options = {
        headers: {
            'x-rapidapi-key': process.env.APIKEY
        }
    };

    const url = `${process.env.FOOTBALLBaseURL}/odds/bets`;
    const response = await axios.get(url, options);

    if(response.status === 200){
        console.log('fixture api response --> ', response.data);
        try {
            const fixture = new Fixture({
                fixtures: response.data.response
            })
            const savedFixture = await fixture.save();
            return {
                data: savedFixture,
                message: `Live fixtures ${response.data.response.length} saved successfully`
            }
        } catch (error) {
            throw new Error(error)
        }
    }
  
}

module.exports = { getAllLiveFixturesApiCall, getAllHeadToHeadFixturesApiCall, getAllTransfersApiCall, getAllStandingsApiCall, getAllLeagueSeasonApiCall, getAllLeaguesApiCall, getAllOddLiveApiCall, getAllOddLiveBetsApiCall, getAllOddApiCall, getAllMappingApiCall, getAllBookMakingApiCall, getAllOddBetsApiCall }