export interface UserProfile {
  uid: string;
  email: string;
  hostelId: 'hostel1_boys' | 'hostel3_girls';

  // Basic Information
  name: string;
  whatsapp: string;
  yearOfStudy: 'Freshman' | 'Sophomore' | 'Junior' | 'Senior';
  branch: 'ECS' | 'HSS' | 'Mathematics' | 'Physics' | 'Biology' | 'Chemistry' | 'Data Science';
  rollNumber: string;
  currentFloor: 'Ground' | '1st' | '2nd' | '3rd' | '4th';
  hostelBlock: string;
  roomNumber: string;
  currentRoommate: {
    name: string;
    year: string;
  };
  isLookingForRoommate: boolean;

  // Daily Routine
  dailyRoutine: {
    wakeUp: '5-6 AM' | '6-7 AM' | '7-8 AM' | 'After 8 AM';
    sleep: 'Before 10 PM' | '10-11 PM' | '11-12 AM' | 'After 12 AM';
    classSchedule: 'Morning' | 'Afternoon' | 'Evening' | 'Flexible';
    studyHours: 'Early Morning' | 'Afternoon' | 'Late Night' | 'Flexible';
  };

  // Study Preferences
  studyPreferences: {
    location: 'Room' | 'Library' | 'Common Room' | 'Reading Hall' | "Doesn't Matter";
    style: 'Complete Silence' | 'Light Music' | 'Group Study' | "Doesn't Matter";
    projectWork: 'Solo' | 'Collaborative' | "Doesn't Matter";
  };

  // Lifestyle
  lifestyle: {
    cleanliness: 'Very Tidy' | 'Moderate' | 'Relaxed' | "Doesn't Matter";
    organization: 'Everything in Place' | 'Organized Chaos' | 'Flexible' | "Doesn't Matter";
    visitors: 'Rarely' | 'Weekends' | 'Often' | "Doesn't Matter";
    music: 'Headphones Only' | 'Low Speaker Volume' | 'No Music' | "Doesn't Matter";
    lights: 'Early (by 10 PM)' | 'Late (after midnight)' | "Doesn't Matter";
  };

  // Social Activities
  socialActivities: {
    sports: 'Active Athlete' | 'Casual Player' | 'Not Interested' | "Doesn't Matter";
    clubs: string[];
    weekend: 'Stay In Hostel' | 'Go Home' | 'Explore City' | "Doesn't Matter";
    mess: 'Early Batch' | 'Regular Batch' | 'Late Batch' | "Doesn't Matter";
    commonRoom: 'Frequently' | 'Sometimes' | 'Rarely' | "Doesn't Matter";
  };

  // Room Preferences
  roomPreferences: {
    floor: 'Ground Floor' | '1st Floor' | '2nd Floor' | '3rd Floor' | '4th Floor' | 'Any Floor';
    orientation: 'East Facing' | 'West Facing' | 'North Facing' | 'South Facing' | 'Any Direction';
    nearBathroom: 'Yes, Prefer' | 'No, Avoid' | "Doesn't Matter";
    nearCommon: 'Yes, Prefer' | 'No, Avoid' | "Doesn't Matter";
    corner: 'Prefer Corner' | 'Avoid Corner' | "Doesn't Matter";
  };

  // Previous Roommate
  previousRoommate: {
    name: string;
    startDate: Date;
    endDate: Date;
  };

  // Personal Descriptions
  aboutYourself: string;
  idealRoommate: string;

  // AI Embeddings
  aboutYourselfEmbedding: number[];
  idealRoommateEmbedding: number[];

  // Matching Configuration
  matchingPriority: string[];

  // Metadata
  createdAt: Date;
  lastUpdated: Date;
  lastActive: Date;
  profileCompleteness: number;
}
