'use client';
import type { UserProfile } from '@/lib/types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CheckCircle2, Copy, HeartHandshake, MessageSquare, User, XCircle } from 'lucide-react';
import Image from 'next/image';
import { Separator } from '../ui/separator';

type RoommateCardProps = {
  user: UserProfile;
};

function MatchPercentage({ score }: { score: number }) {
  const getColorClasses = () => {
    if (score >= 80) return 'from-green-400 to-emerald-600 text-white';
    if (score >= 60) return 'from-blue-400 to-indigo-600 text-white';
    if (score >= 40) return 'from-orange-400 to-amber-600 text-white';
    return 'from-gray-400 to-gray-600 text-white';
  };

  return (
    <div className={`flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${getColorClasses()} shadow-lg`}>
      <span className="text-2xl font-bold">{score}</span>
      <span className="text-xs">%</span>
    </div>
  );
}

export function RoommateCard({ user }: RoommateCardProps) {
  const matchScore = Math.floor(Math.random() * 61) + 40; // Mock score

  return (
    <Card className="overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
        <Accordion type="single" collapsible>
            <AccordionItem value="item-1" className="border-b-0">
                <CardHeader className="p-4 flex flex-row items-start gap-4 space-y-0">
                    <Image
                        src={`https://placehold.co/80x80.png`}
                        alt={user.name}
                        width={80}
                        height={80}
                        className="rounded-full border-2 border-primary/20"
                        data-ai-hint="profile picture"
                    />
                    <div className="grid gap-1 flex-1">
                        <h3 className="text-lg font-semibold font-headline">{user.name}</h3>
                        <div className="flex flex-wrap gap-1">
                            <Badge variant="secondary">{user.yearOfStudy}</Badge>
                            <Badge variant="secondary">{user.branch}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            {user.hostelBlock}, Room {user.roomNumber}
                        </p>
                    </div>
                    <MatchPercentage score={matchScore} />
                </CardHeader>

                <CardContent className="p-4 pt-0">
                     <div className="text-sm space-y-2 mb-4">
                        <div className="flex items-start">
                            <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                            <span>Same sleep schedule (11 PM - 7 AM)</span>
                        </div>
                        <div className="flex items-start">
                            <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                            <span>Both prefer quiet study</span>
                        </div>
                        <div className="flex items-start">
                            <HeartHandshake className="w-4 h-4 mr-2 mt-0.5 text-blue-500 flex-shrink-0" />
                            <span>Interests: Startups, Coding</span>
                        </div>
                    </div>
                    
                    <AccordionTrigger className="bg-muted/50 hover:bg-muted rounded-md px-4 py-2 text-sm">View Details</AccordionTrigger>
                </CardContent>

                <AccordionContent>
                    <div className="px-4 pb-4 space-y-4">
                        <Separator />
                        <div>
                            <h4 className="font-semibold mb-2">Contact</h4>
                            <div className="flex gap-2">
                                <Button size="sm" variant="outline"><MessageSquare className="mr-2 h-4 w-4"/> WhatsApp</Button>
                                <Button size="sm" variant="outline" onClick={() => navigator.clipboard.writeText(user.email)}>
                                    <Copy className="mr-2 h-4 w-4"/> Email
                                </Button>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-2">About Them</h4>
                            <p className="text-sm text-muted-foreground italic">"{user.aboutYourself}"</p>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-2">Looking for...</h4>
                            <p className="text-sm text-muted-foreground italic">"{user.idealRoommate}"</p>
                        </div>

                         <div className="space-y-2">
                            <h4 className="font-semibold mb-2">AI Compatibility Analysis</h4>
                             <div className="flex items-start text-sm">
                                 <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                                 <span>High personality match (88%) based on self-description.</span>
                             </div>
                             <div className="flex items-start text-sm">
                                 <User className="w-4 h-4 mr-2 mt-0.5 text-blue-500 flex-shrink-0" />
                                 <span>Moderate expectation alignment (72%). You seem to value cleanliness more.</span>
                             </div>
                             <div className="flex items-start text-sm">
                                 <XCircle className="w-4 h-4 mr-2 mt-0.5 text-orange-500 flex-shrink-0" />
                                 <span>Potential Conflict: Different wake-up times on weekends might need discussion.</span>
                             </div>
                        </div>
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    </Card>
  );
}
