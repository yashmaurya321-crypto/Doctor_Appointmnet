const doctors = [
    {
        id: 1,
        name: 'Dr. Prerna',
        speciality: 'Obesity',
        followers: 1200,
        video: 450,
        image: "https://familydoctor.org/wp-content/uploads/2018/02/41808433_l.jpg",
        yearofexperience: 7,
        Bio: "Dr. Prerna specializes in managing Obesity and weight-related issues. She has helped many patients achieve their health goals through personalized treatment plans.",
        reviews: [
            { star: 3, comment: "Dr. Prerna helped me lose weight in a safe and effective manner. Highly recommend!" },
            { star: 4, comment: "She is great, but the process takes time. Worth the wait." }
        ],
        workExperience: [
            { hospital: "Clinic A", years: "2015-2020", street: "123 First Ave" },
            { hospital: "Wellness Center", years: "2020-Present", street: "456 Second St" }
        ],
        academicQualification: [
            { degree: "MBBS", year: "2012", street: "123 Education Blvd" },
            { degree: "MD in Endocrinology", year: "2015", street: "456 Medical St" }
        ]
    },
    {
        id: 2,
        name: 'Dr. John Doe',
        speciality: 'Cardiology',
        followers: 1000,
        video: 450,
        image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        yearofexperience: 10,
        Bio: "Dr. John is a highly experienced cardiologist known for his compassionate care and in-depth knowledge of heart conditions.",
        reviews: [
            { star: 4, comment: "Dr. John is an excellent cardiologist who helped me understand my heart condition." },
            { star: 4, comment: "Great doctor, very attentive, but could improve appointment times." }
        ],
        workExperience: [
            { hospital: "Hospital A", years: "2010-2015", street: "789 Heart Ave" },
            { hospital: "Heart Care Center", years: "2015-Present", street: "321 Heartbeat Rd" }
        ],
        academicQualification: [
            { degree: "MBBS", year: "2005", street: "987 Medical Blvd" },
            { degree: "MD in Cardiology", year: "2007", street: "654 Heart St" }
        ]
    },
    {
        id: 3,
        name: 'Dr. Anita Sharma',
        speciality: 'Hypertension',
        followers: 800,
        video: 450,
        image: "https://familydoctor.org/wp-content/uploads/2018/02/41808433_l.jpg",
        yearofexperience: 8,
        Bio: "Dr. Anita Sharma is an expert in managing high blood pressure and associated cardiovascular conditions.",
        reviews: [
            { star: 5, comment: "Dr. Anita's treatment has helped me manage my blood pressure effectively." },
            { star: 4, comment: "She's a great doctor but a bit pricey." }
        ],
        workExperience: [
            { hospital: "Health Clinic", years: "2014-2019", street: "123 Health Ave" },
            { hospital: "Hypertension Center", years: "2019-Present", street: "456 Pressure Rd" }
        ],
        academicQualification: [
            { degree: "MBBS", year: "2010", street: "123 Health Blvd" },
            { degree: "MD in Internal Medicine", year: "2013", street: "456 Medical St" }
        ]
    },
    {
        id: 4,
        name: 'Dr. Priya Mehta',
        speciality: 'Diabetes',
        followers: 950,
        image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        yearofexperience: 9,
        video: 450,
        Bio: "Dr. Priya Mehta specializes in treating patients with diabetes and helps them manage their condition effectively.",
        reviews: [
            { star: 2, comment: "Dr. Priya was instrumental in helping me manage my diabetes. She explained everything in detail." },
            { star: 4, comment: "Good doctor, but the clinic needs better infrastructure." }
        ],
        workExperience: [
            { hospital: "Diabetes Center", years: "2014-2018", street: "234 Sugar St" },
            { hospital: "Wellness Hospital", years: "2018-Present", street: "345 Health Blvd" }
        ],
        academicQualification: [
            { degree: "MBBS", year: "2011", street: "123 Education Blvd" },
            { degree: "MD in Endocrinology", year: "2014", street: "456 Medical St" }
        ]
    },
    {
        id: 5,
        name: 'Dr. Sameer Khan',
        speciality: 'PCOS',
        video: 450,
        followers: 700,
        image: "https://familydoctor.org/wp-content/uploads/2018/02/41808433_l.jpg",
        yearofexperience: 6,
        Bio: "Dr. Sameer specializes in the treatment of PCOS (Polycystic Ovary Syndrome) and related hormonal imbalances.",
        reviews: [
            { star: 3, comment: "Dr. Sameer helped me manage my PCOS symptoms with a comprehensive treatment plan." },
            { star: 4, comment: "He's good, but sometimes hard to get an appointment." }
        ],
        workExperience: [
            { hospital: "Gynecology Clinic", years: "2016-2019", street: "123 Female Ave" },
            { hospital: "PCOS Center", years: "2019-Present", street: "456 Hormone St" }
        ],
        academicQualification: [
            { degree: "MBBS", year: "2010", street: "123 Education Blvd" },
            { degree: "MD in Obstetrics and Gynecology", year: "2013", street: "789 Women's Rd" }
        ]
    },
    {
        id: 6,
        name: 'Dr. Anjali Kumar',
        speciality: 'Anxiety',
        followers: 600,
        video: 450,
        image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        yearofexperience: 7,
        Bio: "Dr. Anjali is a specialist in mental health, specifically treating patients suffering from anxiety and stress.",
        reviews: [
            { star: 3.5, comment: "Dr. Anjali helped me cope with my anxiety. Her approach is kind and effective." },
            { star: 4, comment: "She is very professional and knowledgeable." }
        ],
        workExperience: [
            { hospital: "Mental Health Clinic", years: "2015-2018", street: "123 Mind St" },
            { hospital: "Anxiety Care Center", years: "2018-Present", street: "456 Calm Ave" }
        ],
        academicQualification: [
            { degree: "MBBS", year: "2012", street: "123 Education Blvd" },
            { degree: "MD in Psychiatry", year: "2015", street: "456 Mind St" }
        ]
    },
    {
        id: 7,
        name: 'Dr. Rina Gupta',
        speciality: 'Insomnia',
        followers: 750,
        video: 450,
        image: "https://familydoctor.org/wp-content/uploads/2018/02/41808433_l.jpg",
        yearofexperience: 9,
        Bio: "Dr. Rina specializes in the treatment of insomnia and sleep-related issues.",
        reviews: [
            { star: 4.5, comment: "Dr. Rina helped me overcome my insomnia with a detailed plan and therapy." },
            { star: 4, comment: "Great doctor, helped me sleep better." }
        ],
        workExperience: [
            { hospital: "Sleep Clinic", years: "2014-2018", street: "123 Sleep St" },
            { hospital: "Sleep Disorder Center", years: "2018-Present", street: "456 Dream Rd" }
        ],
        academicQualification: [
            { degree: "MBBS", year: "2010", street: "123 Education Blvd" },
            { degree: "MD in Sleep Medicine", year: "2013", street: "456 Sleep St" }
        ]
    },
    {
        id: 8,
        name: 'Dr. Rajesh Desai',
        speciality: 'Hypertension',
        followers: 1100,
        video: 450,
        image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        yearofexperience: 11,
        Bio: "Dr. Rajesh is an expert in managing high blood pressure and heart conditions.",
        reviews: [
            { star: 5, comment: "Dr. Rajesh was very thorough in his approach to managing my hypertension." },
            { star: 4, comment: "He explained everything in detail, but the wait times are a bit long." }
        ],
        workExperience: [
            { hospital: "Heart Clinic", years: "2010-2015", street: "123 Heart Rd" },
            { hospital: "Hypertension Treatment Center", years: "2015-Present", street: "456 Blood Pressure St" }
        ],
        academicQualification: [
            { degree: "MBBS", year: "2005", street: "123 Education Blvd" },
            { degree: "MD in Cardiology", year: "2008", street: "456 Heart St" }
        ]
    },
    {
        id: 9,
        name: 'Dr. Smita Verma',
        speciality: 'Diabetes',
        followers: 850,
        image: "https://familydoctor.org/wp-content/uploads/2018/02/41808433_l.jpg",
        yearofexperience: 8,
        Bio: "Dr. Smita specializes in the management of diabetes and its complications.",
        reviews: [
            { star: 2.4, comment: "Dr. Smita helped me keep my blood sugar levels under control with the right treatment." },
            { star: 4, comment: "She is good at explaining things, but the clinic's facilities could be better." }
        ],
        workExperience: [
            { hospital: "Diabetes Hospital", years: "2012-2016", street: "234 Sugar St" },
            { hospital: "Endocrine Clinic", years: "2016-Present", street: "345 Diabetes Rd" }
        ],
        academicQualification: [
            { degree: "MBBS", year: "2007", street: "123 Education Blvd" },
            { degree: "MD in Endocrinology", year: "2010", street: "456 Medical St" }
        ],
        video: 450
    },
    {
        id: 10,
        name: 'Dr. Abhinav Kapoor',
        speciality: 'Cardiology',
        followers: 1300,
        video: 450,
        image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        yearofexperience: 12,
        Bio: "Dr. Abhinav Kapoor is a renowned cardiologist who provides state-of-the-art care to his patients.",
        reviews: [
            { star: 5, comment: "Dr. Abhinav is the best! He treated my heart condition effectively." },
            { star: 4, comment: "A bit expensive, but well worth it for the level of care provided." }
        ],
        workExperience: [
            { hospital: "Cardio Care Center", years: "2008-2014", street: "456 Heartbeat Rd" },
            { hospital: "Heart Specialist Clinic", years: "2014-Present", street: "789 Cardiovascular Ave" }
        ],
        academicQualification: [
            { degree: "MBBS", year: "2003", street: "987 Education Blvd" },
            { degree: "MD in Cardiology", year: "2006", street: "654 Heart St" }
        ]
    }
];

export default doctors;