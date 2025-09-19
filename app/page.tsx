"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sprout, User, MapPin, Calendar, Bell, BookOpen, MessageCircle, TrendingUp, Menu, X } from "lucide-react"

const STORAGE_KEYS = {
  FARMER_DATA: "krishi-sakhi-farmer-data",
  ACTIVITIES: "krishi-sakhi-activities",
  CHAT_HISTORY: "krishi-sakhi-chat",
  ALERTS: "krishi-sakhi-alerts",
}

interface FarmerData {
  name: string
  phone: string
  location: string
  farmSize: string
  crops: string[]
  experience: string
  isRegistered: boolean
}

interface Activity {
  id: string
  type: string
  crop: string
  notes: string
  date: string
  status: "completed" | "pending" | "scheduled"
}

interface ChatMessage {
  id: string
  sender: "user" | "ai"
  message: string
  timestamp: string
}

export default function FarmingAssistant() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isRegistered, setIsRegistered] = useState(false)
  const [activeTab, setActiveTab] = useState("dashboard")
  const [farmerData, setFarmerData] = useState<FarmerData>({
    name: "",
    phone: "",
    location: "",
    farmSize: "",
    crops: [],
    experience: "",
    isRegistered: false,
  })
  const [activities, setActivities] = useState<Activity[]>([])
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [newActivity, setNewActivity] = useState({
    type: "",
    crop: "",
    notes: "",
  })

  useEffect(() => {
    const savedFarmerData = localStorage.getItem(STORAGE_KEYS.FARMER_DATA)
    const savedActivities = localStorage.getItem(STORAGE_KEYS.ACTIVITIES)
    const savedChatHistory = localStorage.getItem(STORAGE_KEYS.CHAT_HISTORY)

    if (savedFarmerData) {
      const data = JSON.parse(savedFarmerData)
      setFarmerData(data)
      setIsRegistered(data.isRegistered)
    }

    if (savedActivities) {
      setActivities(JSON.parse(savedActivities))
    } else {
      // Default activities
      const defaultActivities: Activity[] = [
        {
          id: "1",
          type: "watering",
          crop: "Coconut trees",
          notes: "Morning watering completed",
          date: new Date().toISOString(),
          status: "completed",
        },
        {
          id: "2",
          type: "fertilizing",
          crop: "Rice field",
          notes: "Applied organic fertilizer",
          date: new Date(Date.now() - 86400000).toISOString(),
          status: "completed",
        },
        {
          id: "3",
          type: "pest-control",
          crop: "All crops",
          notes: "Scheduled pest inspection",
          date: new Date(Date.now() + 86400000).toISOString(),
          status: "scheduled",
        },
      ]
      setActivities(defaultActivities)
      localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(defaultActivities))
    }

    if (savedChatHistory) {
      setChatHistory(JSON.parse(savedChatHistory))
    } else {
      // Default chat messages
      const defaultChat: ChatMessage[] = [
        {
          id: "1",
          sender: "ai",
          message: "നമസ്കാരം! എങ്ങനെ സഹായിക്കാം? (Hello! How can I help you?)",
          timestamp: new Date().toISOString(),
        },
      ]
      setChatHistory(defaultChat)
      localStorage.setItem(STORAGE_KEYS.CHAT_HISTORY, JSON.stringify(defaultChat))
    }
  }, [])

  useEffect(() => {
    if (farmerData.name) {
      localStorage.setItem(STORAGE_KEYS.FARMER_DATA, JSON.stringify(farmerData))
    }
  }, [farmerData])

  useEffect(() => {
    if (activities.length > 0) {
      localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(activities))
    }
  }, [activities])

  useEffect(() => {
    if (chatHistory.length > 0) {
      localStorage.setItem(STORAGE_KEYS.CHAT_HISTORY, JSON.stringify(chatHistory))
    }
  }, [chatHistory])

  const handleRegistration = (e: React.FormEvent) => {
    e.preventDefault()
    const updatedData = { ...farmerData, isRegistered: true }
    setFarmerData(updatedData)
    setIsRegistered(true)
    setActiveTab("dashboard")
  }

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      message: newMessage,
      timestamp: new Date().toISOString(),
    }

    const aiResponse: ChatMessage = {
      id: (Date.now() + 1).toString(),
      sender: "ai",
      message: getAIResponse(newMessage),
      timestamp: new Date().toISOString(),
    }

    setChatHistory((prev) => [...prev, userMessage, aiResponse])
    setNewMessage("")
  }

  const getAIResponse = (message: string): string => {
    const responses = [
      "നെല്ലിന്റെ രോഗം കണ്ടെത്താൻ ഇലകളുടെ ഫോട്ടോ അയച്ചു തരാമോ? (Can you send a photo of the leaves to identify the disease?)",
      "ഈ സീസണിൽ കാലാവസ്ഥ അനുസരിച്ച് വെള്ളം കുറച്ച് കൊടുക്കുക. (Give less water according to this season's weather.)",
      "ജൈവ വളം ഉപയോഗിക്കുന്നത് മണ്ണിന്റെ ആരോഗ്യത്തിന് നല്ലതാണ്. (Using organic fertilizer is good for soil health.)",
      "പുതിയ സാങ്കേതികവിദ്യകൾ പഠിക്കാൻ നമ്മുടെ വിജ്ഞാന വിഭാഗം സന്ദർശിക്കുക. (Visit our knowledge section to learn new techniques.)",
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const handleAddActivity = () => {
    if (!newActivity.type || !newActivity.crop) return

    const activity: Activity = {
      id: Date.now().toString(),
      type: newActivity.type,
      crop: newActivity.crop,
      notes: newActivity.notes,
      date: new Date().toISOString(),
      status: "completed",
    }

    setActivities((prev) => [activity, ...prev])
    setNewActivity({ type: "", crop: "", notes: "" })
  }

  if (!isRegistered) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
        <div className="max-w-2xl mx-auto pt-4 sm:pt-8">
          <div className="text-center mb-6 sm:mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sprout className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
              <h1 className="text-2xl sm:text-3xl font-bold text-green-800">കൃഷി സഖി</h1>
            </div>
            <p className="text-green-700 text-base sm:text-lg">AI-Powered Personal Farming Assistant</p>
            <p className="text-green-600 mt-2 text-sm sm:text-base">Your Digital Farming Companion for Kerala</p>
          </div>

          <Card className="border-green-200 shadow-lg">
            <CardHeader className="bg-green-50">
              <CardTitle className="text-green-800 text-lg sm:text-xl">Farmer Registration</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Join thousands of Kerala farmers using AI-powered farming assistance
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <form onSubmit={handleRegistration} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-sm">
                      Full Name / പേര്
                    </Label>
                    <Input
                      id="name"
                      placeholder="Enter your name"
                      value={farmerData.name}
                      onChange={(e) => setFarmerData({ ...farmerData, name: e.target.value })}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-sm">
                      Phone Number / ഫോൺ നമ്പർ
                    </Label>
                    <Input
                      id="phone"
                      placeholder="+91 9876543210"
                      value={farmerData.phone}
                      onChange={(e) => setFarmerData({ ...farmerData, phone: e.target.value })}
                      required
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="location" className="text-sm">
                    Location / സ്ഥലം
                  </Label>
                  <Select onValueChange={(value) => setFarmerData({ ...farmerData, location: value })}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select your district" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="thiruvananthapuram">Thiruvananthapuram</SelectItem>
                      <SelectItem value="kollam">Kollam</SelectItem>
                      <SelectItem value="pathanamthitta">Pathanamthitta</SelectItem>
                      <SelectItem value="alappuzha">Alappuzha</SelectItem>
                      <SelectItem value="kottayam">Kottayam</SelectItem>
                      <SelectItem value="idukki">Idukki</SelectItem>
                      <SelectItem value="ernakulam">Ernakulam</SelectItem>
                      <SelectItem value="thrissur">Thrissur</SelectItem>
                      <SelectItem value="palakkad">Palakkad</SelectItem>
                      <SelectItem value="malappuram">Malappuram</SelectItem>
                      <SelectItem value="kozhikode">Kozhikode</SelectItem>
                      <SelectItem value="wayanad">Wayanad</SelectItem>
                      <SelectItem value="kannur">Kannur</SelectItem>
                      <SelectItem value="kasaragod">Kasaragod</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="farmSize" className="text-sm">
                      Farm Size / കൃഷിയിടത്തിന്റെ വലിപ്പം
                    </Label>
                    <Select onValueChange={(value) => setFarmerData({ ...farmerData, farmSize: value })}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select farm size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small (&lt; 2 acres)</SelectItem>
                        <SelectItem value="medium">Medium (2-5 acres)</SelectItem>
                        <SelectItem value="large">Large (&gt; 5 acres)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="experience" className="text-sm">
                      Farming Experience / അനുഭവം
                    </Label>
                    <Select onValueChange={(value) => setFarmerData({ ...farmerData, experience: value })}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Years of experience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner (&lt; 2 years)</SelectItem>
                        <SelectItem value="intermediate">Intermediate (2-10 years)</SelectItem>
                        <SelectItem value="experienced">Experienced (&gt; 10 years)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="crops" className="text-sm">
                    Primary Crops / പ്രധാന വിളകൾ
                  </Label>
                  <Textarea
                    id="crops"
                    placeholder="Rice, Coconut, Pepper, Cardamom, etc."
                    className="min-h-20 mt-1"
                    value={farmerData.crops.join(", ")}
                    onChange={(e) =>
                      setFarmerData({ ...farmerData, crops: e.target.value.split(",").map((item) => item.trim()) })
                    }
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-sm sm:text-base py-2 sm:py-3"
                >
                  Register & Start Farming Journey
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <header className="bg-white border-b border-green-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <Sprout className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
              <div>
                <h1 className="text-lg sm:text-2xl font-bold text-green-800">കൃഷി സഖി</h1>
                <p className="text-xs sm:text-sm text-green-600 hidden sm:block">
                  Welcome back, {farmerData.name || "Farmer"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs hidden sm:inline-flex">
                <MapPin className="h-3 w-3 mr-1" />
                {farmerData.location || "Kerala"}
              </Badge>
              <Button variant="outline" size="sm" className="hidden sm:inline-flex bg-transparent">
                <User className="h-4 w-4 mr-1" />
                Profile
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="sm:hidden bg-transparent"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 sm:hidden" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="fixed right-0 top-0 h-full w-64 bg-white shadow-lg p-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-green-800">Menu</h2>
              <Button variant="ghost" size="sm" onClick={() => setIsMobileMenuOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-start">
                <User className="h-4 w-4 mr-2" />
                Profile
              </Button>
              <div className="flex items-center gap-2 p-2">
                <MapPin className="h-3 w-3 text-green-600" />
                <span className="text-sm text-green-800">{farmerData.location || "Kerala"}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-2 sm:py-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 sm:grid-cols-6 bg-white border border-green-200 h-auto">
            <TabsTrigger
              value="dashboard"
              className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 text-xs sm:text-sm"
            >
              <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Dashboard</span>
              <span className="sm:hidden">Home</span>
            </TabsTrigger>
            <TabsTrigger
              value="chat"
              className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 text-xs sm:text-sm"
            >
              <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">AI Chat</span>
              <span className="sm:hidden">Chat</span>
            </TabsTrigger>
            <TabsTrigger
              value="activities"
              className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 text-xs sm:text-sm"
            >
              <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Activities</span>
              <span className="sm:hidden">Tasks</span>
            </TabsTrigger>
            <TabsTrigger
              value="alerts"
              className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 text-xs sm:text-sm"
            >
              <Bell className="h-3 w-3 sm:h-4 sm:w-4" />
              Alerts
            </TabsTrigger>
            <TabsTrigger
              value="knowledge"
              className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 text-xs sm:text-sm"
            >
              <BookOpen className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Knowledge</span>
              <span className="sm:hidden">Learn</span>
            </TabsTrigger>
            <TabsTrigger
              value="schemes"
              className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 text-xs sm:text-sm"
            >
              <Sprout className="h-3 w-3 sm:h-4 sm:w-4" />
              Schemes
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="mt-4 sm:mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              <Card className="border-green-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-green-800 flex items-center gap-2 text-base sm:text-lg">
                    <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
                    Today's Tasks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {activities.slice(0, 3).map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-center justify-between p-2 bg-green-50 rounded text-sm"
                      >
                        <span className="truncate">
                          {activity.type} - {activity.crop}
                        </span>
                        <Badge variant={activity.status === "completed" ? "secondary" : "outline"} className="text-xs">
                          {activity.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-green-800 flex items-center gap-2 text-base sm:text-lg">
                    <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
                    Weather Alert
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
                      <p className="text-sm font-medium text-yellow-800">Heavy Rain Expected</p>
                      <p className="text-xs text-yellow-700 mt-1">Next 2 days - Protect crops from waterlogging</p>
                    </div>
                    <div className="text-sm text-muted-foreground">Temperature: 28°C | Humidity: 85%</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-green-800 flex items-center gap-2 text-base sm:text-lg">
                    <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" />
                    Farm Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Rice Cultivation</span>
                        <span>75%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: "75%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Coconut Care</span>
                        <span>60%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: "60%" }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="chat" className="mt-4 sm:mt-6">
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800 text-base sm:text-lg">AI Farming Assistant</CardTitle>
                <CardDescription className="text-sm">
                  Ask questions in Malayalam or English about farming practices
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 sm:h-96 bg-gray-50 rounded-lg p-3 sm:p-4 mb-4 overflow-y-auto">
                  <div className="space-y-3 sm:space-y-4">
                    {chatHistory.map((message) => (
                      <div
                        key={message.id}
                        className={`${message.sender === "user" ? "bg-green-100 ml-4 sm:ml-8" : "bg-white"} p-2 sm:p-3 rounded-lg shadow-sm`}
                      >
                        <p className="text-xs sm:text-sm text-gray-600 mb-1">
                          {message.sender === "user" ? "You" : "AI Assistant"}
                        </p>
                        <p className="text-sm sm:text-base">{message.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Type your question in Malayalam or English..."
                    className="flex-1 text-sm sm:text-base"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  />
                  <Button className="bg-green-600 hover:bg-green-700" onClick={handleSendMessage}>
                    Send
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activities" className="mt-4 sm:mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <Card className="border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-800 text-base sm:text-lg">Activity Log</CardTitle>
                  <CardDescription className="text-sm">Track your daily farming activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-64 sm:max-h-96 overflow-y-auto">
                    {activities.map((activity) => (
                      <div key={activity.id} className="flex items-center justify-between p-3 bg-green-50 rounded">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm sm:text-base truncate">
                            {activity.type} - {activity.crop}
                          </p>
                          <p className="text-xs sm:text-sm text-gray-600">
                            {new Date(activity.date).toLocaleDateString()}
                          </p>
                          {activity.notes && <p className="text-xs text-gray-500 mt-1 truncate">{activity.notes}</p>}
                        </div>
                        <Badge
                          className={`ml-2 text-xs ${activity.status === "completed" ? "bg-green-600" : activity.status === "scheduled" ? "bg-blue-600" : "bg-yellow-600"}`}
                        >
                          {activity.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-800 text-base sm:text-lg">Add New Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm">Activity Type</Label>
                      <Select
                        value={newActivity.type}
                        onValueChange={(value) => setNewActivity({ ...newActivity, type: value })}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select activity" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="watering">Watering</SelectItem>
                          <SelectItem value="fertilizing">Fertilizing</SelectItem>
                          <SelectItem value="pest-control">Pest Control</SelectItem>
                          <SelectItem value="harvesting">Harvesting</SelectItem>
                          <SelectItem value="planting">Planting</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm">Crop/Area</Label>
                      <Input
                        placeholder="e.g., Rice field, Coconut grove"
                        className="mt-1"
                        value={newActivity.crop}
                        onChange={(e) => setNewActivity({ ...newActivity, crop: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label className="text-sm">Notes</Label>
                      <Textarea
                        placeholder="Additional details..."
                        className="mt-1"
                        value={newActivity.notes}
                        onChange={(e) => setNewActivity({ ...newActivity, notes: e.target.value })}
                      />
                    </div>
                    <Button className="w-full bg-green-600 hover:bg-green-700" onClick={handleAddActivity}>
                      Log Activity
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Alerts Tab */}
          <TabsContent value="alerts" className="mt-4 sm:mt-6">
            <div className="space-y-4">
              <Card className="border-red-200 bg-red-50">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-start gap-3">
                    <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-red-800 text-sm sm:text-base">
                        Pest Alert - Brown Plant Hopper
                      </h3>
                      <p className="text-xs sm:text-sm text-red-700 mt-1">
                        High risk in your area. Check rice fields immediately.
                      </p>
                      <p className="text-xs text-red-600 mt-2">2 hours ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-yellow-200 bg-yellow-50">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-start gap-3">
                    <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-yellow-800 text-sm sm:text-base">Weather Warning</h3>
                      <p className="text-xs sm:text-sm text-yellow-700 mt-1">
                        Heavy rainfall expected. Prepare drainage systems.
                      </p>
                      <p className="text-xs text-yellow-600 mt-2">5 hours ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-start gap-3">
                    <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-blue-800 text-sm sm:text-base">Market Price Update</h3>
                      <p className="text-xs sm:text-sm text-blue-700 mt-1">
                        Coconut prices increased by 15% in local markets.
                      </p>
                      <p className="text-xs text-blue-600 mt-2">1 day ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Knowledge Tab */}
          <TabsContent value="knowledge" className="mt-4 sm:mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <Card className="border-green-200 hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-green-800 text-base sm:text-lg">Rice Cultivation</CardTitle>
                  <CardDescription className="text-sm">Complete guide to rice farming in Kerala</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-xs sm:text-sm">• Seed selection and preparation</p>
                    <p className="text-xs sm:text-sm">• Water management techniques</p>
                    <p className="text-xs sm:text-sm">• Pest and disease control</p>
                    <p className="text-xs sm:text-sm">• Harvesting best practices</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200 hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-green-800 text-base sm:text-lg">Coconut Farming</CardTitle>
                  <CardDescription className="text-sm">Comprehensive coconut cultivation guide</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-xs sm:text-sm">• Planting and spacing</p>
                    <p className="text-xs sm:text-sm">• Fertilization schedule</p>
                    <p className="text-xs sm:text-sm">• Common diseases and treatment</p>
                    <p className="text-xs sm:text-sm">• Harvesting and processing</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200 hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-green-800 text-base sm:text-lg">Spice Cultivation</CardTitle>
                  <CardDescription className="text-sm">Pepper, cardamom, and other spices</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-xs sm:text-sm">• Climate requirements</p>
                    <p className="text-xs sm:text-sm">• Soil preparation</p>
                    <p className="text-xs sm:text-sm">• Organic farming methods</p>
                    <p className="text-xs sm:text-sm">• Market trends and pricing</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Schemes Tab */}
          <TabsContent value="schemes" className="mt-4 sm:mt-6">
            <div className="space-y-4 sm:space-y-6">
              <Card className="border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-800 text-base sm:text-lg">Available Government Schemes</CardTitle>
                  <CardDescription className="text-sm">
                    Financial assistance and support programs for Kerala farmers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 sm:p-4 border border-green-200 rounded-lg">
                      <h3 className="font-semibold text-green-800 text-sm sm:text-base">PM-KISAN Scheme</h3>
                      <p className="text-xs sm:text-sm text-gray-600 mt-1">₹6,000 per year direct benefit transfer</p>
                      <div className="flex items-center justify-between mt-3">
                        <Badge className="bg-green-600 text-xs">Eligible</Badge>
                        <Button variant="outline" size="sm" className="text-xs sm:text-sm bg-transparent">
                          Apply Now
                        </Button>
                      </div>
                    </div>

                    <div className="p-3 sm:p-4 border border-green-200 rounded-lg">
                      <h3 className="font-semibold text-green-800 text-sm sm:text-base">Crop Insurance Scheme</h3>
                      <p className="text-xs sm:text-sm text-gray-600 mt-1">
                        Protection against crop loss due to natural calamities
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <Badge className="bg-blue-600 text-xs">Available</Badge>
                        <Button variant="outline" size="sm" className="text-xs sm:text-sm bg-transparent">
                          Learn More
                        </Button>
                      </div>
                    </div>

                    <div className="p-3 sm:p-4 border border-green-200 rounded-lg">
                      <h3 className="font-semibold text-green-800 text-sm sm:text-base">Organic Farming Support</h3>
                      <p className="text-xs sm:text-sm text-gray-600 mt-1">
                        Subsidies for organic certification and inputs
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <Badge variant="outline" className="text-xs">
                          Processing
                        </Badge>
                        <Button variant="outline" size="sm" className="text-xs sm:text-sm bg-transparent">
                          Check Status
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
