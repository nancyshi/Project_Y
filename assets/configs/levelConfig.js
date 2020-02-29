var bulletBaseWidth = 100
var disFromBorder = 10
var levelConfig = {
    "1": {
        physicalPowerCost: 2,
        heartForRetryCost: 2,
        // bullets:[
        //     {
        //         scale: 1,
        //         x: 0,
        //         y: 0
        //     }
        // ],
        // wallPathes: [
        //     {
        //         lineWidth: 10,
        //         offset: cc.v2(0,0),
        //         isClosed: true,
        //         points: [
        //             {
        //                 x: 0,
        //                 y: 0
        //             },
        //             {
        //                 x: 0,
        //                 y: bulletBaseWidth + 2 * disFromBorder
        //             },
        //             {
        //                 x: bulletBaseWidth + disFromBorder,
        //                 y: 0
        //             },
        //             {
        //                 x: 0,
        //                 y: bulletBaseWidth + disFromBorder
        //             },
        //             {
        //                 x: bulletBaseWidth + 2 * disFromBorder,
        //                 y: 0
        //             },
        //             {
        //                 x: 0,
        //                 y: -(bulletBaseWidth + disFromBorder)
        //             },
        //             {
        //                 x: 2 * bulletBaseWidth + 2 * disFromBorder,
        //                 y: 0
        //             },
        //             {
        //                 x: 0,
        //                 y: -(3 * bulletBaseWidth + 4 * disFromBorder)
        //             },
        //             {
        //                 x: -(3 * bulletBaseWidth + 4 * disFromBorder),
        //                 y: 0
        //             },
        //             {
        //                 x: 0,
        //                 y: 2 * bulletBaseWidth + 2 * disFromBorder
        //             },
        //             {
        //                 x: -(bulletBaseWidth + disFromBorder),
        //                 y: 0
        //             }
        //         ]
        //     }
        // ]
    },
    "2": {
        physicalPowerCost: 3,
        heartForRetryCost: 2
    }, 
    "3": {
        physicalPowerCost: 3,
        heartForRetryCost: 2
    },
    "4": {
        physicalPowerCost: 3,
        heartForRetryCost: 2
    },
    "5": {
        physicalPowerCost: 3,
        heartForRetryCost: 2
    },
    "6": {
        physicalPowerCost: 3,
        heartForRetryCost: 2
    }
}

module.exports = levelConfig