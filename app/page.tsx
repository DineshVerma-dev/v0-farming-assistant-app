"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sprout, User, MapPin, Calendar, Bell, BookOpen, MessageCircle, TrendingUp } from "lucide-react"

export default function FarmingAssistant() {
  const [isRegistered, setIsRegistered] = useState(false)
  const [activeTab, setActiveTab] = useState("dashboard")
  const [farmerData, setFarmerData] = useState({
    name: "",
    phone: "",
    location: "",
    farmSize: "",
    crops: [],
    experience: "",
  })

  const handleRegistration = (e: React.FormEvent) => {
    e.preventDefault()
    setIsRegistered(true)
    setActiveTab("dashboard")
  }

  if (!isRegistered) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
        <div className="max-w-2xl mx-auto pt-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sprout className="h-8 w-8 text-green-600" />
              <h1 className="text-3xl font-bold text-green-800">കൃഷി സഖി</h1>
            </div>
            <p className="text-green-700 text-lg">AI-Powered Personal Farming Assistant</p>
            <p className="text-green-600 mt-2">Your Digital Farming Companion for Kerala</p>
          </div>

          <Card className="border-green-200 shadow-lg">
            <CardHeader className="bg-green-50">
              <CardTitle className="text-green-800">Farmer Registration</CardTitle>
              <CardDescription>Join thousands of Kerala farmers using AI-powered farming assistance</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleRegistration} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name / പേര്</Label>
                    <Input
                      id="name"
                      placeholder="Enter your name"
                      value={farmerData.name}
                      onChange={(e) => setFarmerData({ ...farmerData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number / ഫോൺ നമ്പർ</Label>
                    <Input
                      id="phone"
                      placeholder="+91 9876543210"
                      value={farmerData.phone}
                      onChange={(e) => setFarmerData({ ...farmerData, phone: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="location">Location / സ്ഥലം</Label>
                  <Select onValueChange={(value) => setFarmerData({ ...farmerData, location: value })}>
                    <SelectTrigger>
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="farmSize">Farm Size / കൃഷിയിടത്തിന്റെ വലിപ്പം</Label>
                    <Select onValueChange={(value) => setFarmerData({ ...farmerData, farmSize: value })}>
                      <SelectTrigger>
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
                    <Label htmlFor="experience">Farming Experience / അനുഭവം</Label>
                    <Select onValueChange={(value) => setFarmerData({ ...farmerData, experience: value })}>
                      <SelectTrigger>
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
                  <Label htmlFor="crops">Primary Crops / പ്രധാന വിളകൾ</Label>
                  <Textarea
                    id="crops"
                    placeholder="Rice, Coconut, Pepper, Cardamom, etc."
                    className="min-h-20"
                    value={farmerData.crops}
                    onChange={(e) =>
                      setFarmerData({ ...farmerData, crops: e.target.value.split(",").map((item) => item.trim()) })
                    }
                  />
                </div>

                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
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
      {/* Header */}
      <header className="bg-white border-b border-green-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sprout className="h-8 w-8 text-green-600" />
              <div>
                <h1 className="text-2xl font-bold text-green-800">കൃഷി സഖി</h1>
                <p className="text-sm text-green-600">Welcome back, {farmerData.name || "Farmer"}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <MapPin className="h-3 w-3 mr-1" />
                {farmerData.location || "Kerala"}
              </Badge>
              <Button variant="outline" size="sm">
                <User className="h-4 w-4 mr-1" />
                Profile
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 bg-white border border-green-200">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              AI Chat
            </TabsTrigger>
            <TabsTrigger value="activities" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Activities
            </TabsTrigger>
            <TabsTrigger value="alerts" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Alerts
            </TabsTrigger>
            <TabsTrigger value="knowledge" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Knowledge
            </TabsTrigger>
            <TabsTrigger value="schemes" className="flex items-center gap-2">
              <Sprout className="h-4 w-4" />
              Schemes
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border-green-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-green-800 flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Today's Tasks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                      <span className="text-sm">Water coconut trees</span>
                      <Badge variant="outline" className="text-xs">
                        Pending
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                      <span className="text-sm">Check pest traps</span>
                      <Badge variant="outline" className="text-xs">
                        Pending
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm">Apply fertilizer</span>
                      <Badge variant="secondary" className="text-xs">
                        Completed
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-green-800 flex items-center gap-2">
                    <Bell className="h-5 w-5" />
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
                  <CardTitle className="text-green-800 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
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

          {/* AI Chat Tab */}
          <TabsContent value="chat" className="mt-6">
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">AI Farming Assistant</CardTitle>
                <CardDescription>Ask questions in Malayalam or English about farming practices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96 bg-gray-50 rounded-lg p-4 mb-4 overflow-y-auto">
                  <div className="space-y-4">
                    <div className="bg-white p-3 rounded-lg shadow-sm">
                      <p className="text-sm text-gray-600 mb-1">AI Assistant</p>
                      <p>നമസ്കാരം! എങ്ങനെ സഹായിക്കാം? (Hello! How can I help you?)</p>
                    </div>
                    <div className="bg-green-100 p-3 rounded-lg shadow-sm ml-8">
                      <p className="text-sm text-gray-600 mb-1">You</p>
                      <p>എന്റെ നെല്ലിന് എന്ത് രോഗമാണ് ഉള്ളത്? (What disease does my rice have?)</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg shadow-sm">
                      <p className="text-sm text-gray-600 mb-1">AI Assistant</p>
                      <p>
                        നെല്ലിന്റെ രോഗം കണ്ടെത്താൻ ഇലകളുടെ ഫോട്ടോ അയച്ചു തരാമോ? സാധാരണ രോഗങ്ങൾ: ബ്ലാസ്റ്റ്, ബ്രൗൺ സ്പോട്ട്, ഷീത്ത് ബ്ലൈറ്റ്. (Can
                        you send a photo of the leaves to identify the disease? Common diseases: Blast, Brown spot,
                        Sheath blight.)
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Input placeholder="Type your question in Malayalam or English..." className="flex-1" />
                  <Button className="bg-green-600 hover:bg-green-700">Send</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activities Tab */}
          <TabsContent value="activities" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-800">Activity Log</CardTitle>
                  <CardDescription>Track your daily farming activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded">
                      <div>
                        <p className="font-medium">Watered coconut trees</p>
                        <p className="text-sm text-gray-600">Today, 6:00 AM</p>
                      </div>
                      <Badge className="bg-green-600">Completed</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded">
                      <div>
                        <p className="font-medium">Applied organic fertilizer</p>
                        <p className="text-sm text-gray-600">Yesterday, 4:00 PM</p>
                      </div>
                      <Badge className="bg-blue-600">Completed</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded">
                      <div>
                        <p className="font-medium">Pest inspection</p>
                        <p className="text-sm text-gray-600">Tomorrow, 7:00 AM</p>
                      </div>
                      <Badge variant="outline">Scheduled</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-800">Add New Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label>Activity Type</Label>
                      <Select>
                        <SelectTrigger>
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
                      <Label>Crop/Area</Label>
                      <Input placeholder="e.g., Rice field, Coconut grove" />
                    </div>
                    <div>
                      <Label>Notes</Label>
                      <Textarea placeholder="Additional details..." />
                    </div>
                    <Button className="w-full bg-green-600 hover:bg-green-700">Log Activity</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Alerts Tab */}
          <TabsContent value="alerts" className="mt-6">
            <div className="space-y-4">
              <Card className="border-red-200 bg-red-50">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Bell className="h-5 w-5 text-red-600 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-red-800">Pest Alert - Brown Plant Hopper</h3>
                      <p className="text-sm text-red-700 mt-1">
                        High risk in your area. Check rice fields immediately.
                      </p>
                      <p className="text-xs text-red-600 mt-2">2 hours ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-yellow-200 bg-yellow-50">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Bell className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-yellow-800">Weather Warning</h3>
                      <p className="text-sm text-yellow-700 mt-1">Heavy rainfall expected. Prepare drainage systems.</p>
                      <p className="text-xs text-yellow-600 mt-2">5 hours ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Bell className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-blue-800">Market Price Update</h3>
                      <p className="text-sm text-blue-700 mt-1">Coconut prices increased by 15% in local markets.</p>
                      <p className="text-xs text-blue-600 mt-2">1 day ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Knowledge Tab */}
          <TabsContent value="knowledge" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border-green-200 hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-green-800 text-lg">Rice Cultivation</CardTitle>
                  <CardDescription>Complete guide to rice farming in Kerala</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm">• Seed selection and preparation</p>
                    <p className="text-sm">• Water management techniques</p>
                    <p className="text-sm">• Pest and disease control</p>
                    <p className="text-sm">• Harvesting best practices</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200 hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-green-800 text-lg">Coconut Farming</CardTitle>
                  <CardDescription>Comprehensive coconut cultivation guide</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm">• Planting and spacing</p>
                    <p className="text-sm">• Fertilization schedule</p>
                    <p className="text-sm">• Common diseases and treatment</p>
                    <p className="text-sm">• Harvesting and processing</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200 hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-green-800 text-lg">Spice Cultivation</CardTitle>
                  <CardDescription>Pepper, cardamom, and other spices</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm">• Climate requirements</p>
                    <p className="text-sm">• Soil preparation</p>
                    <p className="text-sm">• Organic farming methods</p>
                    <p className="text-sm">• Market trends and pricing</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Schemes Tab */}
          <TabsContent value="schemes" className="mt-6">
            <div className="space-y-6">
              <Card className="border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-800">Available Government Schemes</CardTitle>
                  <CardDescription>Financial assistance and support programs for Kerala farmers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border border-green-200 rounded-lg">
                      <h3 className="font-semibold text-green-800">PM-KISAN Scheme</h3>
                      <p className="text-sm text-gray-600 mt-1">₹6,000 per year direct benefit transfer</p>
                      <div className="flex items-center justify-between mt-3">
                        <Badge className="bg-green-600">Eligible</Badge>
                        <Button variant="outline" size="sm">
                          Apply Now
                        </Button>
                      </div>
                    </div>

                    <div className="p-4 border border-green-200 rounded-lg">
                      <h3 className="font-semibold text-green-800">Crop Insurance Scheme</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Protection against crop loss due to natural calamities
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <Badge className="bg-blue-600">Available</Badge>
                        <Button variant="outline" size="sm">
                          Learn More
                        </Button>
                      </div>
                    </div>

                    <div className="p-4 border border-green-200 rounded-lg">
                      <h3 className="font-semibold text-green-800">Organic Farming Support</h3>
                      <p className="text-sm text-gray-600 mt-1">Subsidies for organic certification and inputs</p>
                      <div className="flex items-center justify-between mt-3">
                        <Badge variant="outline">Processing</Badge>
                        <Button variant="outline" size="sm">
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
