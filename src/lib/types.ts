export interface UserProfile {
  uid: string;
  email: string;
  hostelId: 'hostel1_boys' | 'hostel3_girls';

  // Basic Information
  name: string;
  whatsapp: string;
  yearOfStudy: 'Freshman' | 'Sophomore' | 'Junior' | 'Senior' | null;
  branch: 'ECS' | 'HSS' | 'Mathematics' | 'Physics' | 'Biology' | 'Chemistry' | 'Data Science' | null;
  rollNumber: string;
  currentFloor: 'Ground' | '1st' | '2nd' | '3rd' | '4th' | null;
  hostelBlock: string;
  roomNumber: string;
  currentRoommate: {
    name: string;
    year: string;
  } | null;
  isLookingForRoommate: boolean;

  // Daily Routine
  dailyRoutine: {
    wakeUp: '5-6 AM' | '6-7 AM' | '7-8 AM' | 'After 8 AM' | null;
    sleep: 'Before 10 PM' | '10-11 PM' | '11-12 AM' | 'After 12 AM' | null;
    classSchedule: 'Morning' | 'Afternoon' | 'Evening' | 'Flexible' | null;
    studyHours: 'Early Morning' | 'Afternoon' | 'Late Night' | 'Flexible' | null;
  };

  // Study Preferences
  studyPreferences: {
    location: 'Room' | 'Library' | 'Common Room' | 'Reading Hall' | "Doesn't Matter" | null;
    style: 'Complete Silence' | 'Light Music' | 'Group Study' | "Doesn't Matter" | null;
    projectWork: 'Solo' | 'Collaborative' | "Doesn't Matter" | null;
  };

  // Lifestyle
  lifestyle: {
    cleanliness: 'Very Tidy' | 'Moderate' | 'Relaxed' | "Doesn't Matter" | null;
    organization: 'Everything in Place' | 'Organized Chaos' | 'Flexible' | "Doesn't Matter" | null;
    visitors: 'Rarely' | 'Weekends' | 'Often' | "Doesn't Matter" | null;
    music: 'Headphones Only' | 'Low Speaker Volume' | 'No Music' | "Doesn't Matter" | null;
    lights: 'Early (by 10 PM)' | 'Late (after midnight)' | "Doesn't Matter" | null;
  };

  // Social Activities
  socialActivities: {
    sports: 'Active Athlete' | 'Casual Player' | 'Not Interested' | "Doesn't Matter" | null;
    clubs: string[];
    weekend: 'Stay In Hostel' | 'Go Home' | 'Explore City' | "Doesn't Matter" | null;
    mess: 'Early Batch' | 'Regular Batch' | 'Late Batch' | "Doesn't Matter" | null;
    commonRoom: 'Frequently' | 'Sometimes' | 'Rarely' | "Doesn't Matter" | null;
  };

  // Room Preferences
  roomPreferences: {
    floor: 'Ground Floor' | '1st Floor' | '2nd Floor' | '3rd Floor' | '4th Floor' | 'Any Floor' | null;
    orientation: 'East Facing' | 'West Facing' | 'North Facing' | 'South Facing' | 'Any Direction' | null;
    nearBathroom: 'Yes, Prefer' | 'No, Avoid' | "Doesn't Matter" | null;
    nearCommon: 'Yes, Prefer' | 'No, Avoid' | "Doesn't Matter" | null;
    corner: 'Prefer Corner' | 'Avoid Corner' | "Doesn't Matter" | null;
  };

  // Previous Roommate
  previousRoommate: {
    name: string;
    startDate: Date;
    endDate: Date;
  } | null;

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
