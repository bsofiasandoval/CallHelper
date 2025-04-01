"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Clock,
  Download,
  MessageSquare,
  Calendar,
  ChevronLeft,
  BarChart3,
  Share2,
  VolumeX,
  Lightbulb,
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Heart,
  ThumbsUp,
  ThumbsDown,
  UserCircle,
  Radio,
  FileText,
  CalendarClock,
  ArrowUpRight,
  Clipboard,
  Bookmark,
  MoreHorizontal,
  Star,
  TrendingUp,
} from "lucide-react";

export default function CallReport() {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock call data
  const callData = {
    id: "call-2024-04-01-01",
    client: "Acme Corporation",
    project: "Website Redesign Project",
    date: "April 1, 2025",
    startTime: "10:00 AM",
    duration: "45 minutes",
    participants: [
      { name: "Jane Doe", role: "Product Manager", company: "Your Company" },
      { name: "John Smith", role: "Design Director", company: "Acme Corp" },
      { name: "Alice Johnson", role: "Project Lead", company: "Acme Corp" },
    ],
    overallSentiment: 85,
    clientSentiment: 82,
    yourTeamSentiment: 88,
    keyTopics: [
      { name: "Timeline", mentions: 14, sentiment: 72 },
      { name: "Budget", mentions: 9, sentiment: 65 },
      { name: "Design", mentions: 22, sentiment: 91 },
      { name: "Features", mentions: 18, sentiment: 88 },
      { name: "User Testing", mentions: 7, sentiment: 79 },
    ],
    speakingRatio: {
      client: 42,
      yourTeam: 58,
    },
  };

  // Helper function to get sentiment color
  const getSentimentColor = (score: number) => {
    if (score >= 80) return "text-green-400";
    if (score >= 60) return "text-amber-400";
    return "text-red-400";
  };

  const getBgSentimentColor = (score: number) => {
    if (score >= 80) return "bg-green-500/20";
    if (score >= 60) return "bg-amber-500/20";
    return "bg-red-500/20";
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Header */}
      <header className="h-16 border-b border-zinc-800 flex items-center justify-between px-6 bg-zinc-900/50">
        <div className="flex items-center">
          <div className="font-bold text-xl text-white flex items-center">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-600 mr-3 flex items-center justify-center">
              <MessageSquare size={16} className="text-white" />
            </div>
            team<span className="text-blue-500">track</span>
          </div>

          <div className="ml-8 flex items-center space-x-5">
            <Button variant="ghost" className="text-zinc-400 hover:text-white">
              Dashboard
            </Button>
            <Button variant="ghost" className="text-zinc-400 hover:text-white">
              Calls
            </Button>
            <Button variant="ghost" className="text-zinc-400 hover:text-white">
              Reports
            </Button>
            <Button variant="ghost" className="text-zinc-400 hover:text-white">
              Clients
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Select defaultValue="acme">
            <SelectTrigger className="w-44 bg-zinc-800 border-zinc-700 text-white">
              <SelectValue placeholder="Select organization" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
              <SelectItem value="acme">Acme Corp</SelectItem>
              <SelectItem value="globex">Globex</SelectItem>
              <SelectItem value="initech">Initech</SelectItem>
              <SelectItem value="umbrella">Umbrella Corp</SelectItem>
              <SelectItem value="stark">Stark Industries</SelectItem>
            </SelectContent>
          </Select>

          <Avatar className="h-9 w-9">
            <AvatarImage src="/avatar.png" />
            <AvatarFallback className="bg-indigo-600">JD</AvatarFallback>
          </Avatar>
        </div>
      </header>

      {/* Content Area */}
      <main className="container mx-auto px-6 py-8">
        {/* Back navigation and actions */}
        <div className="flex justify-between items-center mb-6">
          <Button variant="ghost" className="text-zinc-400 hover:text-white">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Calls
          </Button>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700"
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700"
            >
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 bg-zinc-800 border-zinc-700 text-white"
                >
                  <MoreHorizontal size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-zinc-800 border-zinc-700 text-white"
              >
                <DropdownMenuItem className="cursor-pointer hover:bg-zinc-700">
                  <Bookmark className="mr-2 h-4 w-4" />
                  Save as Template
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer hover:bg-zinc-700">
                  <CalendarClock className="mr-2 h-4 w-4" />
                  Schedule Follow-up
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer hover:bg-zinc-700">
                  <FileText className="mr-2 h-4 w-4" />
                  Print Report
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Call Header */}
        <Card className="bg-zinc-800/50 border-zinc-700 mb-6">
          <CardContent className="p-6">
            <div className="flex justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white mb-1">
                  {callData.client}: {callData.project}
                </h1>
                <div className="flex items-center space-x-5 text-zinc-400 text-sm">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    {callData.date}
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    {callData.startTime} ({callData.duration})
                  </div>
                  <Badge
                    variant="outline"
                    className="text-xs border-zinc-600 bg-zinc-800 text-indigo-200"
                  >
                    <Radio className="h-3 w-3 text-indigo-400" />
                    Recorded
                  </Badge>
                </div>
              </div>

              <div className="text-right">
                <div className="text-sm text-zinc-400 mb-1">
                  Overall Call Sentiment
                </div>
                <div className="flex items-center justify-end">
                  <div className="text-2xl font-bold text-white mr-2">
                    {callData.overallSentiment}%
                  </div>
                  <div
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getBgSentimentColor(
                      callData.overallSentiment
                    )} ${getSentimentColor(callData.overallSentiment)}`}
                  >
                    Positive
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Participants */}
        <div className="flex items-center space-x-2 mb-6">
          <div className="text-sm text-zinc-400 mr-2">Participants:</div>
          {callData.participants.map((participant, index) => (
            <div key={index} className="flex items-center">
              <Avatar className="h-7 w-7 mr-1">
                <AvatarFallback
                  className={
                    participant.company === "Your Company"
                      ? "bg-indigo-600/30 text-indigo-400"
                      : "bg-zinc-700/30 text-zinc-400"
                  }
                >
                  {participant.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="text-sm text-zinc-300">{participant.name}</div>
              {index < callData.participants.length - 1 && (
                <div className="mx-2 text-zinc-600">•</div>
              )}
            </div>
          ))}
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="bg-zinc-800 border-b border-zinc-700 w-full justify-start rounded-none p-0 h-auto">
            <TabsTrigger
              value="overview"
              className="px-4 py-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-indigo-500 data-[state=active]:text-white rounded-none"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="transcript"
              className="px-4 py-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-indigo-500 data-[state=active]:text-white rounded-none"
            >
              Transcript
            </TabsTrigger>
            <TabsTrigger
              value="insights"
              className="px-4 py-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-indigo-500 data-[state=active]:text-white rounded-none"
            >
              AI Insights
            </TabsTrigger>
            <TabsTrigger
              value="actions"
              className="px-4 py-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-indigo-500 data-[state=active]:text-white rounded-none"
            >
              Action Items
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab Content */}
          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Key Metrics */}
              <div className="lg:col-span-2 space-y-6">
                {/* Sentiment Analysis Card */}
                <Card className="bg-zinc-800/50 border-zinc-700">
                  <CardHeader>
                    <CardTitle className="text-white">
                      Sentiment Analysis
                    </CardTitle>
                    <CardDescription className="text-zinc-400">
                      Emotional tone throughout the conversation
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-5">
                      <div>
                        <div className="flex justify-between mb-2 text-sm">
                          <span className="text-zinc-400">
                            Client Sentiment
                          </span>
                          <span
                            className={getSentimentColor(
                              callData.clientSentiment
                            )}
                          >
                            {callData.clientSentiment}%
                          </span>
                        </div>
                        <Progress
                          value={callData.clientSentiment}
                          className="h-2 bg-zinc-700"
                        >
                          <div
                            className={`h-full transition-all ${
                              callData.clientSentiment >= 80
                                ? "bg-green-500"
                                : callData.clientSentiment >= 60
                                ? "bg-amber-500"
                                : "bg-red-500"
                            }`}
                            style={{ width: `${callData.clientSentiment}%` }}
                          />
                        </Progress>
                      </div>

                      <div>
                        <div className="flex justify-between mb-2 text-sm">
                          <span className="text-zinc-400">
                            Your Team Sentiment
                          </span>
                          <span
                            className={getSentimentColor(
                              callData.yourTeamSentiment
                            )}
                          >
                            {callData.yourTeamSentiment}%
                          </span>
                        </div>
                        <Progress
                          value={callData.yourTeamSentiment}
                          className="h-2 bg-zinc-700"
                        >
                          <div
                            className={`h-full transition-all ${
                              callData.yourTeamSentiment >= 80
                                ? "bg-green-500"
                                : callData.yourTeamSentiment >= 60
                                ? "bg-amber-500"
                                : "bg-red-500"
                            }`}
                            style={{ width: `${callData.yourTeamSentiment}%` }}
                          />
                        </Progress>
                      </div>

                      <div className="grid grid-cols-5 gap-3 pt-3">
                        {[
                          {
                            emotion: "Enthusiasm",
                            score: 83,
                            icon: <Heart className="h-4 w-4" />,
                          },
                          {
                            emotion: "Agreement",
                            score: 75,
                            icon: <ThumbsUp className="h-4 w-4" />,
                          },
                          {
                            emotion: "Confusion",
                            score: 24,
                            icon: <AlertTriangle className="h-4 w-4" />,
                          },
                          {
                            emotion: "Hesitation",
                            score: 32,
                            icon: <Clock3 className="h-4 w-4" />,
                          },
                          {
                            emotion: "Frustration",
                            score: 12,
                            icon: <ThumbsDown className="h-4 w-4" />,
                          },
                        ].map((emotion, index) => (
                          <div
                            key={index}
                            className="text-center p-3 rounded-lg bg-zinc-900/60"
                          >
                            <div
                              className={`mx-auto w-8 h-8 rounded-full flex items-center justify-center mb-2 ${getBgSentimentColor(
                                emotion.score === 24 ||
                                  emotion.score === 32 ||
                                  emotion.score === 12
                                  ? 100 - emotion.score
                                  : emotion.score
                              )}`}
                            >
                              {emotion.icon}
                            </div>
                            <div className="text-xs text-zinc-300 mb-1">
                              {emotion.emotion}
                            </div>
                            <div
                              className={`text-sm font-medium ${getSentimentColor(
                                emotion.emotion === "Confusion" ||
                                  emotion.emotion === "Hesitation" ||
                                  emotion.emotion === "Frustration"
                                  ? 100 - emotion.score
                                  : emotion.score
                              )}`}
                            >
                              {emotion.score}%
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 text-sm text-zinc-400">
                        <p>
                          <span className="font-medium text-white">
                            Analysis:
                          </span>{" "}
                          The call maintained positive sentiment throughout with
                          high levels of enthusiasm and agreement. Minor
                          confusion was detected during technical discussions
                          (13:22 - 15:04) but was quickly resolved.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Key Topics Card */}
                <Card className="bg-zinc-800/50 border-zinc-700">
                  <CardHeader>
                    <CardTitle className="text-white">Key Topics</CardTitle>
                    <CardDescription className="text-zinc-400">
                      Most discussed subjects and associated sentiment
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {callData.keyTopics.map((topic, index) => (
                        <div
                          key={index}
                          className="bg-zinc-900/60 p-4 rounded-lg"
                        >
                          <div className="flex justify-between mb-2">
                            <div className="font-medium text-white">
                              {topic.name}
                            </div>
                            <div className="text-sm text-zinc-400">
                              {topic.mentions} mentions
                            </div>
                          </div>

                          <div className="flex items-center justify-between mb-1">
                            <div className="w-full mr-4">
                              <Progress
                                value={topic.sentiment}
                                className="h-2 bg-zinc-700"
                              >
                                <div
                                  className={`h-full transition-all ${
                                    topic.sentiment >= 80
                                      ? "bg-green-500"
                                      : topic.sentiment >= 60
                                      ? "bg-amber-500"
                                      : "bg-red-500"
                                  }`}
                                  style={{ width: `${topic.sentiment}%` }}
                                />
                              </Progress>
                            </div>
                            <div
                              className={`text-sm ${getSentimentColor(
                                topic.sentiment
                              )}`}
                            >
                              {topic.sentiment}%
                            </div>
                          </div>

                          {/* Contextual notes for each topic */}
                          <div className="text-xs text-zinc-400 mt-1">
                            {topic.name === "Timeline" &&
                              "Client expressed some concern about project timeline (17:05)"}
                            {topic.name === "Budget" &&
                              "Discussion about budget constraints and allocations"}
                            {topic.name === "Design" &&
                              "Very positive reception to design mockups presented"}
                            {topic.name === "Features" &&
                              "Agreement on core features and prioritization"}
                            {topic.name === "User Testing" &&
                              "Brief discussion about testing schedule"}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Speaking Patterns & Insights */}
              <div className="lg:col-span-1 space-y-6">
                {/* Speaking Patterns */}
                <Card className="bg-zinc-800/50 border-zinc-700">
                  <CardHeader>
                    <CardTitle className="text-white">
                      Speaking Patterns
                    </CardTitle>
                    <CardDescription className="text-zinc-400">
                      Conversation participation analysis
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="w-44 h-44 mx-auto mb-4 relative">
                      <div className="w-full h-full rounded-full bg-zinc-700">
                        <div
                          className="absolute top-0 left-0 bg-indigo-600 rounded-full overflow-hidden"
                          style={{
                            width: "100%",
                            height: "100%",
                            clipPath: `polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 0, 50% 50%, 50% 50%, 50% 50%)`,
                            transform: `rotate(${callData.speakingRatio.yourTeam}deg)`,
                          }}
                        ></div>
                        <div
                          className="absolute top-0 left-0 bg-purple-500 rounded-full overflow-hidden"
                          style={{
                            width: "100%",
                            height: "100%",
                            clipPath: `polygon(50% 50%, 50% 0, ${
                              callData.speakingRatio.client > 50
                                ? "100% 0, 100% 100%, 0 100%, 0 0"
                                : "100% 0"
                            }, 50% 50%)`,
                          }}
                        ></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-20 h-20 rounded-full bg-zinc-800 flex items-center justify-center text-center">
                            <div>
                              <div className="text-xs text-zinc-400">
                                Speaking Ratio
                              </div>
                              <div className="text-lg font-bold text-white">
                                {callData.speakingRatio.yourTeam}:
                                {callData.speakingRatio.client}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-indigo-600 mr-2"></div>
                        <div className="text-sm text-zinc-300">Your Team</div>
                      </div>
                      <div className="text-sm font-medium text-white">
                        {callData.speakingRatio.yourTeam}%
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                        <div className="text-sm text-zinc-300">Client</div>
                      </div>
                      <div className="text-sm font-medium text-white">
                        {callData.speakingRatio.client}%
                      </div>
                    </div>

                    <div className="mt-4 text-sm text-zinc-400 bg-zinc-900/60 p-3 rounded-lg">
                      <p>
                        Your team had slightly more speaking time, but
                        maintained good balance with client participation. There
                        were no significant interruptions detected.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* AI Quick Insights */}
                <Card className="bg-zinc-800/50 border-zinc-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Lightbulb className="mr-2 h-5 w-5 text-amber-400" />
                      Quick Insights
                    </CardTitle>
                    <CardDescription className="text-zinc-400">
                      AI-detected patterns and recommendations
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="bg-green-500/10 border border-green-500/20 p-3 rounded-lg">
                      <div className="text-sm font-medium text-green-400 mb-1 flex items-center">
                        <CheckCircle2 className="h-4 w-4 mr-1" />
                        Strength
                      </div>
                      <div className="text-xs text-zinc-300">
                        Excellent explanation of technical concepts using visual
                        aids. Client engagement increased 37% during demos.
                      </div>
                    </div>

                    <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-lg">
                      <div className="text-sm font-medium text-amber-400 mb-1 flex items-center">
                        <AlertTriangle className="h-4 w-4 mr-1" />
                        Opportunity
                      </div>
                      <div className="text-xs text-zinc-300">
                        Client asked about timeline twice (12:05, 29:17) with
                        increasing concern. Consider providing a detailed
                        timeline document.
                      </div>
                    </div>

                    <div className="bg-indigo-500/10 border border-indigo-500/20 p-3 rounded-lg">
                      <div className="text-sm font-medium text-indigo-400 mb-1 flex items-center">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        Pattern Detected
                      </div>
                      <div className="text-xs text-zinc-300">
                        Client uses "we need" phrasing to indicate high-priority
                        requirements. This pattern appeared 7 times.
                      </div>
                    </div>

                    <div className="bg-purple-500/10 border border-purple-500/20 p-3 rounded-lg">
                      <div className="text-sm font-medium text-purple-400 mb-1 flex items-center">
                        <Star className="h-4 w-4 mr-1" />
                        Client Preference
                      </div>
                      <div className="text-xs text-zinc-300">
                        Client showed strongest positive reactions to minimalist
                        design examples (21:15-23:40).
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="ghost"
                      className="w-full text-indigo-400 hover:text-indigo-300 hover:bg-zinc-700/50"
                    >
                      View Detailed Analysis
                    </Button>
                  </CardFooter>
                </Card>

                {/* Next Steps */}
                <Card className="bg-zinc-800/50 border-zinc-700">
                  <CardHeader>
                    <CardTitle className="text-white">
                      Recommended Next Steps
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start">
                      <div className="mr-3 mt-0.5">
                        <div className="w-5 h-5 rounded-full border-2 border-indigo-500 flex items-center justify-center">
                          <div className="w-2.5 h-2.5 rounded-full bg-indigo-500"></div>
                        </div>
                      </div>
                      <div className="text-sm text-zinc-300">
                        Send detailed project timeline by{" "}
                        <span className="text-white font-medium">
                          April 3, 2025
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="mr-3 mt-0.5">
                        <div className="w-5 h-5 rounded-full border-2 border-indigo-500 flex items-center justify-center">
                          <div className="w-2.5 h-2.5 rounded-full bg-indigo-500"></div>
                        </div>
                      </div>
                      <div className="text-sm text-zinc-300">
                        Schedule user testing workshop for{" "}
                        <span className="text-white font-medium">week 2</span>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="mr-3 mt-0.5">
                        <div className="w-5 h-5 rounded-full border-2 border-indigo-500 flex items-center justify-center">
                          <div className="w-2.5 h-2.5 rounded-full bg-indigo-500"></div>
                        </div>
                      </div>
                      <div className="text-sm text-zinc-300">
                        Prepare budget breakdown for phase 2 features
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                      <Clipboard className="mr-2 h-4 w-4" />
                      Add to Tasks
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Placeholder content for other tabs */}
          <TabsContent value="transcript" className="mt-6">
            <Card className="bg-zinc-800/50 border-zinc-700">
              <CardHeader>
                <CardTitle className="text-white">
                  Full Conversation Transcript
                </CardTitle>
                <CardDescription className="text-zinc-400">
                  Complete text with sentiment analysis and highlights
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-zinc-400">
                  [Transcript content would appear here with highlighted
                  insights and timestamps]
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="mt-6">
            <Card className="bg-zinc-800/50 border-zinc-700">
              <CardHeader>
                <CardTitle className="text-white">
                  Detailed AI Analysis
                </CardTitle>
                <CardDescription className="text-zinc-400">
                  In-depth insights from communication patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-zinc-400">
                  [Detailed AI insights would appear here]
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="actions" className="mt-6">
            <Card className="bg-zinc-800/50 border-zinc-700">
              <CardHeader>
                <CardTitle className="text-white">
                  Action Items & Follow-up
                </CardTitle>
                <CardDescription className="text-zinc-400">
                  Tasks and commitments from the call
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-zinc-400">
                  [Action items and follow-up tasks would appear here]
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
