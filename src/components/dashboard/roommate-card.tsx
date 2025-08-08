
'use client';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Copy, MessageSquare, UserCheck, UserX, CheckCircle2, AlertTriangle } from 'lucide-react';
import Image from 'next/image';
import { Separator } from '../ui/separator';
import { UserWithMatchData } from '@/app/[hostelId]/dashboard/page';
import { Avatar, AvatarFallback } from '../ui/avatar';

type RoommateCardProps = {
  user: UserWithMatchData;
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
  const matchScore = user.compatibilityScore || 0;

  return (
    <Card className="overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
        <Accordion type="single" collapsible>
            <AccordionItem value="item-1" className="border-b-0">
                <CardHeader className="p-4 flex flex-row items-start gap-4 space-y-0">
                    <Avatar className="w-20 h-20 border-2 border-primary/20">
                      <AvatarFallback className="text-3xl">
                        {user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
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
                      {user.strengths && user.strengths.length > 0 && (
                        <div className="flex items-start">
                          <UserCheck className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                          <span>Strong alignment in: {user.strengths.join(', ')}</span>
                        </div>
                      )}
                      {user.conflicts && user.conflicts.length > 0 && (
                        <div className="flex items-start">
                          <UserX className="w-4 h-4 mr-2 mt-0.5 text-orange-500 flex-shrink-0" />
                          <span>Potential conflict in: {user.conflicts.join(', ')}</span>
                        </div>
                      )}
                    </div>
                    
                    <AccordionTrigger className="bg-muted/50 hover:bg-muted rounded-md px-4 py-2 text-sm">View Full Analysis</AccordionTrigger>
                </CardContent>

                <AccordionContent>
                    <div className="px-4 pb-4 space-y-4">
                        <Separator />
                        <div>
                            <h4 className="font-semibold mb-2">Contact</h4>
                            <div className="flex gap-2">
                                <Button size="sm" variant="outline" asChild>
                                  <a href={`https://wa.me/${user.whatsapp?.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer">
                                    <MessageSquare className="mr-2 h-4 w-4"/> WhatsApp
                                  </a>
                                </Button>
                                <Button size="sm" variant="outline" onClick={() => navigator.clipboard.writeText(user.email || '')}>
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

                         <div className="space-y-4">
                            <h4 className="font-semibold">AI Compatibility Analysis</h4>
                             <p className="text-sm text-muted-foreground">{user.matchAnalysis}</p>
                            
                            {user.aiStrengths && user.aiStrengths.length > 0 && (
                                <div className="space-y-2">
                                    {user.aiStrengths.map((strength, index) => (
                                        <div key={`strength-${index}`} className="flex items-start gap-2 text-sm">
                                            <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                            <span>{strength}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                            
                            {user.aiConflicts && user.aiConflicts.length > 0 && (
                                <div className="space-y-2">
                                    {user.aiConflicts.map((conflict, index) => (
                                        <div key={`conflict-${index}`} className="flex items-start gap-2 text-sm">
                                            <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                                            <span>{conflict}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    </Card>
  );
}
