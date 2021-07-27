/*
 * Purpose: Store Init
 * Author: John
 * */


import createPersistedState from "vuex-persistedstate";

export const state = () => ({
    subCons: [
        { name: "MUTIARA ENTERPRISE", work: ["PR01", "MEW02", "LSW01", "MTW02", "URC01", "PRL02"], ongoing: [], rating: [4] },
        { name: "Sub-Contractor 2", work: ["PR01", "MEW02"], ongoing: [], rating: [4] },
        { name: "Sub-Contractor 4", work: ["LSW01", "MTW02", "URC01", "PRL02"], ongoing: [], rating: [4] },
        { name: "Sub-Contractor 5", work: ["PR01", "LSW01",], ongoing: [], rating: [4] },
        { name: "Sub-Contractor 6", work: ["PR01"], ongoing: [], rating: [4, 3] },

    ],
    wpc: [{
        name: "ABC Company", work: [
            {
                scope: "Signages",
                code: "PR01",
                startDate: "Jan2021",
                grade: "G1",
                amount: 115000,
                status: "Not Awarded",
                subCons: "",
                revisedAwardDate: "",
                progressAmt: "",
                progressPercent: "",
                rating: null
            },
            {
                scope: "Fencing",
                code: "MEW02",
                startDate: "Jan2021",
                grade: "G1",
                amount: 200000,
                status: "Not Awarded",
                subCons: "",
                revisedAwardDate: "",
                progressAmt: "",
                progressPercent: "",
                rating: null
            },
            {
                scope: "Landscaping",
                code: "LSW01",
                startDate: "Jan2021",
                grade: "G1",
                amount: 440000,
                status: "On-going",
                subCons: "MUTIARA ENTERPRISE",
                revisedAwardDate: "Mac2022",
                progressAmt: 16000,
                progressPercent: "80%",
                rating: null,
            },
            {
                scope: "Security",
                code: "MTW02",
                startDate: "Jan2021",
                grade: "G1",
                amount: 350000,
                status: "Not Awarded",
                subCons: "",
                revisedAwardDate: "",
                progressAmt: "",
                progressPercent: "",
                rating: null
            },
            {
                scope: "Street Lighting",
                code: "URC01",
                startDate: "Jan2021",
                grade: "G1",
                amount: 567000,
                status: "Not Awarded",
                subCons: "",
                revisedAwardDate: "",
                progressAmt: "",
                progressPercent: "",
                rating: null
            },
            {
                scope: "Hoarding",
                code: "PRL02",
                startDate: "Jan2021",
                grade: "G1",
                amount: 88000,
                status: "Late",
                subCons: "Sub-Contractor 2",
                revisedAwardDate: "",
                progressAmt: "16000",
                progressPercent: "20%",
                rating: null
            },
        ],
    },
    {
        name: "EFG Company",
        work: [
            {
                scope: "Signages",
                code: "PR01",
                startDate: "Jan2021",
                grade: "G1",
                amount: 115000,
                status: "Not Awarded",
                subCons: "",
                revisedAwardDate: "",
                progressAmt: "",
                progressPercent: "",
                rating: null
            },

            {
                scope: "Fencing",
                code: "MEW02",
                startDate: "Jan2021",
                grade: "G1",
                amount: 200000,
                status: "Not Awarded",
                subCons: "",
                revisedAwardDate: "",
                progressAmt: "",
                progressPercent: "",
                rating: null
            },
            {
                scope: "Landscaping",
                code: "LSW01",
                startDate: "Jan2021",
                grade: "G1",
                amount: 440000,
                status: "On-going",
                subCons: "MUTIARA ENTERPRISE",
                revisedAwardDate: "Mac2022",
                progressAmt: 16000,
                progressPercent: "80%",
                rating: null
            },
            {
                scope: "Security",
                code: "MTW02",
                startDate: "Jan2021",
                grade: "G1",
                amount: 350000,
                status: "Not Awarded",
                subCons: "",
                revisedAwardDate: "",
                progressAmt: "",
                progressPercent: "",
                rating: null
            },
            {
                scope: "Street Lighting",
                code: "URC01",
                startDate: "Jan2021",
                grade: "G1",
                amount: 567000,
                status: "Not Awarded",
                subCons: "",
                revisedAwardDate: "",
                progressAmt: "",
                progressPercent: "",
                rating: null
            },
            {
                scope: "Hoarding",
                code: "PRL02",
                startDate: "Jan2021",
                grade: "G1",
                amount: 88000,
                status: "Late",
                subCons: "Sub-Contractor 2",
                revisedAwardDate: "",
                progressAmt: "16000",
                progressPercent: "20%",
                rating: null
            },
        ],
    }]
});

export const mutations = {
    UPDATE_RATING(state, rating) {
        console.log(rating.index, rating.rating)
        state.subCons[rating.index].rating.push(rating.rating)
    },
    UPDATE_WPC(state, wpc) {
        console.log(state.wpc[wpc.index], wpc.wpc)
        state.wpc[wpc.index] = wpc.wpc
    },
};


export const getters = {
    getRating(state) {
        const found = state.subCons.map(x => {
            let object = { ...x, rating: (x.rating.reduce((a, b) => a + b, 0) / x.rating.length) };
            return object
        });

        return found
    },
    getWPC(state) {
        console.log(state.wpc)
        return [...state.wpc]
    },
    getSubcons(state) {
        return [...state.subCons]
    }

};



export const actions = {

    rateSubCon({ dispatch, commit, state }, subConRating) {
        //update subCon rating
        const index = state.subCons.findIndex(x => x.name == subConRating.name)
        commit("UPDATE_RATING", { index, rating: subConRating.rating })
    },

    updateWPCWork({ dispatch, commit, state }, wpc) {
        //update subCon rating

        const index = state.wpc.findIndex(x => x.name == wpc.name)
        console.log(wpc, index)
        commit("UPDATE_WPC", { wpc, index })
    }
    // Use firebase SDK to switch to a login state - happens at the login page

}