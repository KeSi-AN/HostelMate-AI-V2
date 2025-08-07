import type { UserProfile } from './types';

const names = ['Aarav Sharma', 'Vivaan Singh', 'Aditya Kumar', 'Vihaan Gupta', 'Arjun Patel', 'Sai Joshi', 'Reyansh Reddy', 'Krishna Verma', 'Ishaan Srinivasan', 'Diya Mehta', 'Saanvi Rao', 'Aanya Shah', 'Myra Choudhary', 'Aarohi Iyer', 'Anika Pillai'];
const years: UserProfile['yearOfStudy'][] = ['Freshman', 'Sophomore', 'Junior', 'Senior'];
const branches: UserProfile['branch'][] = ['ECS', 'HSS', 'Mathematics', 'Physics', 'Biology', 'Chemistry', 'Data Science'];
const blocks = ['A', 'B', 'C', 'D'];
const abouts = [
    "I'm a night owl who loves coding and gaming. I keep my space organized and enjoy philosophical discussions. I'm into fitness and wake up early for gym.",
    "Early bird, love reading and sketching. I prefer a quiet and calm environment. I'm tidy and expect the same. Big fan of indie music.",
    "I'm pretty chill and go with the flow. Mostly busy with my coursework. I enjoy watching movies and occasional weekend outings. Not a neat freak but I keep my stuff contained.",
    "Aspiring entrepreneur, always working on some side project. I'm a social person and have friends over sometimes. My sleep schedule is a bit chaotic."
];
const ideals = [
    "Looking for someone who respects personal space, maintains cleanliness, and has a similar sleep schedule. Bonus if they're into tech or entrepreneurship.",
    "Seeking a roommate who is also focused on their studies, is quiet, and clean. Someone who appreciates a peaceful living space.",
    "Need a roommate who is easy-going and respectful. Not too loud. Preferably someone who is also in a technical branch.",
    "Looking for an ambitious and friendly roommate. Someone who is social but also knows when to give space. Cleanliness is a must."
];

export const getMockUsers = (count: number): UserProfile[] => {
  const users: UserProfile[] = [];
  for (let i = 0; i < count; i++) {
    const user: UserProfile = {
      uid: `user_${i + 1}`,
      email: `${names[i % names.length].split(' ')[0].toLowerCase()}@college.edu`,
      hostelId: 'hostel1_boys',
      name: names[i % names.length],
      whatsapp: `+91 987654321${i}`,
      yearOfStudy: years[i % years.length],
      branch: branches[i % branches.length],
      rollNumber: `B21${i.toString().padStart(3, '0')}`,
      currentFloor: ['Ground', '1st', '2nd', '3rd', '4th'][i % 5] as any,
      hostelBlock: blocks[i % blocks.length],
      roomNumber: `${(i % 4) + 1}0${i % 10 + 1}`,
      currentRoommate: { name: 'Rohan Mehra', year: 'Junior' },
      isLookingForRoommate: true,
      dailyRoutine: {
        wakeUp: ['6-7 AM', '7-8 AM', 'After 8 AM'][i % 3] as any,
        sleep: ['10-11 PM', '11-12 AM', 'After 12 AM'][i % 3] as any,
        classSchedule: 'Morning',
        studyHours: 'Late Night',
      },
      studyPreferences: {
        location: 'Room',
        style: 'Complete Silence',
        projectWork: 'Collaborative',
      },
      lifestyle: {
        cleanliness: ['Very Tidy', 'Moderate', 'Relaxed'][i % 3] as any,
        organization: 'Organized Chaos',
        visitors: 'Weekends',
        music: 'Headphones Only',
        lights: 'Late (after midnight)',
      },
      socialActivities: {
        sports: 'Casual Player',
        clubs: ['Technical Clubs', 'Entrepreneurship Cell'],
        weekend: 'Stay In Hostel',
        mess: 'Regular Batch',
        commonRoom: 'Sometimes',
      },
      roomPreferences: {
        floor: 'Any Floor',
        orientation: 'Any Direction',
        nearBathroom: "Doesn't Matter",
        nearCommon: "Doesn't Matter",
        corner: "Doesn't Matter",
      },
      previousRoommate: {
        name: 'Previous Pal',
        startDate: new Date(),
        endDate: new Date(),
      },
      aboutYourself: abouts[i % abouts.length],
      idealRoommate: ideals[i % ideals.length],
      aboutYourselfEmbedding: [],
      idealRoommateEmbedding: [],
      matchingPriority: [],
      createdAt: new Date(),
      lastUpdated: new Date(),
      lastActive: new Date(),
      profileCompleteness: 100,
    };
    users.push(user);
  }
  return users;
};
