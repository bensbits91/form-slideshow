export const

    colors = {
        navy: '#1e3b5a',
        mint: '#34bebd',
        green: '#34be78',
        yellow: '#ffc658',
        orange: '#ff7300',
        red: '#be3435',
        pink: '#be347a',
        gray: {
            e: '#eee',
            d: '#ddd',
            c: '#ccc',
            b: '#bbb',
            a: '#aaa',
        },
        black: {
            b9: '#999',
            b8: '#888',
            b7: '#777',
            b5: '#555',
            b4: '#444',
            b3: '#333',
            b2: '#222'
        }
    },

    // def_slides = [
    //     { InternalName: 'RequestType' },

    // ]


    init_fields = [
        // 'Title',
        'RequestType'
    ],


    slide_rules = [
        {
            field: 'RequestType',
            depends: [
                {
                    choice: 'RequestTravel',
                    show: [
                        'TravelType',
                        'TravelReason'
                    ]
                }
            ],
            show: []
        },
        {
            field: 'TravelReason',
            depends: [],
            show: [
                'HasItinerary',
                'DatesFlexible',
                'NeedLodging',
            ]
        },
        {
            field: 'NeedLodging',
            depends: [],
            show: [
                'Comments',
            ]
        },
        {
            field: 'Comments',
            isLastSlide: true
        }
    ]

    ;