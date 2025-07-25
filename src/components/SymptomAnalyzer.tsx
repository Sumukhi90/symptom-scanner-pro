import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Thermometer, 
  Heart, 
  Activity, 
  Brain, 
  Upload, 
  Search, 
  FileText,
  ExternalLink,
  AlertTriangle,
  CheckCircle,
  Clock
} from "lucide-react";

export const SymptomAnalyzer = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  
  const [symptoms, setSymptoms] = useState({
    fever: false,
    feverTemp: '',
    chestPain: false,
    breathingDifficulty: false,
    headache: false,
    nausea: false,
    additionalSymptoms: '',
    patientAge: '',
    patientGender: '',
    medicalHistory: '',
    currentMedications: '',
    duration: ''
  });

  const mockResults = {
    documentsFound: 127,
    searchTime: 2.3,
    diseases: [
      {
        name: "Pneumonia",
        probability: 78,
        confidence: "High",
        documentsSupporting: 45,
        keySymptoms: ["fever", "chest pain", "breathing difficulty"],
        suggestedTests: ["Chest X-ray", "Blood culture", "Sputum culture"],
        urgency: "high"
      },
      {
        name: "Bronchitis",
        probability: 65,
        confidence: "Medium",
        documentsSupporting: 32,
        keySymptoms: ["chest pain", "breathing difficulty"],
        suggestedTests: ["Chest X-ray", "Pulmonary function test"],
        urgency: "medium"
      },
      {
        name: "Viral Upper Respiratory Infection",
        probability: 42,
        confidence: "Medium",
        documentsSupporting: 28,
        keySymptoms: ["fever", "headache"],
        suggestedTests: ["Complete blood count", "Throat culture"],
        urgency: "low"
      }
    ],
    documents: [
      {
        title: "Clinical Guidelines for Pneumonia Diagnosis",
        source: "Journal of American Medical Association",
        year: 2023,
        relevance: 94,
        url: "#"
      },
      {
        title: "Respiratory Infections in Adults: Diagnostic Approaches",
        source: "New England Journal of Medicine",
        year: 2023,
        relevance: 87,
        url: "#"
      },
      {
        title: "Fever Patterns in Bacterial vs Viral Infections",
        source: "Clinical Infectious Diseases",
        year: 2022,
        relevance: 82,
        url: "#"
      }
    ]
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    
    // Simulate analysis progress
    const progressInterval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsAnalyzing(false);
          setShowResults(true);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'destructive';
      case 'medium': return 'outline';
      case 'low': return 'secondary';
      default: return 'secondary';
    }
  };

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case 'high': return <AlertTriangle className="h-4 w-4" />;
      case 'medium': return <Clock className="h-4 w-4" />;
      case 'low': return <CheckCircle className="h-4 w-4" />;
      default: return null;
    }
  };

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 p-4">
        <div className="container max-w-6xl mx-auto space-y-6">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold">Analysis Results</h1>
            <div className="flex justify-center gap-4 text-sm text-muted-foreground">
              <span>🔍 {mockResults.documentsFound} documents analyzed</span>
              <span>⚡ Completed in {mockResults.searchTime}s</span>
            </div>
          </div>

          {/* Disease Probabilities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                Differential Diagnosis (Probability Ranked)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockResults.diseases.map((disease, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-lg">{disease.name}</h3>
                      <Badge variant={getUrgencyColor(disease.urgency)}>
                        {getUrgencyIcon(disease.urgency)}
                        {disease.urgency.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{disease.probability}%</div>
                      <div className="text-sm text-muted-foreground">{disease.confidence} confidence</div>
                    </div>
                  </div>
                  
                  <Progress value={disease.probability} className="h-2" />
                  
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <Label className="font-medium">Matching Symptoms:</Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {disease.keySymptoms.map((symptom, i) => (
                          <Badge key={i} variant="secondary">{symptom}</Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label className="font-medium">Suggested Tests:</Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {disease.suggestedTests.map((test, i) => (
                          <Badge key={i} variant="outline">{test}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    Supported by {disease.documentsSupporting} medical documents
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Supporting Documents */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Supporting Medical Literature
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {mockResults.documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="space-y-1">
                      <h4 className="font-medium">{doc.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {doc.source} • {doc.year}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-sm font-medium">{doc.relevance}% relevance</div>
                        <Progress value={doc.relevance} className="h-1 w-16" />
                      </div>
                      <Button size="sm" variant="outline">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-center gap-4">
            <Button variant="outline" onClick={() => setShowResults(false)}>
              New Analysis
            </Button>
            <Button variant="medical">
              Export Report
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 p-4">
      <div className="container max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Medical Analysis Engine
          </h1>
          <p className="text-xl text-muted-foreground">
            Input patient symptoms and get AI-powered diagnostic insights
          </p>
        </div>

        {/* Analysis Form */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Patient Information & Symptoms
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Patient Demographics */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Patient Age</Label>
                <Input
                  id="age"
                  placeholder="e.g., 45"
                  value={symptoms.patientAge}
                  onChange={(e) => setSymptoms({...symptoms, patientAge: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select value={symptoms.patientGender} onValueChange={(value) => setSymptoms({...symptoms, patientGender: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Symptom Duration</Label>
                <Input
                  id="duration"
                  placeholder="e.g., 3 days"
                  value={symptoms.duration}
                  onChange={(e) => setSymptoms({...symptoms, duration: e.target.value})}
                />
              </div>
            </div>

            {/* Vital Signs & Primary Symptoms */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Thermometer className="h-4 w-4 text-destructive" />
                  Vital Signs
                </h3>
                
                <div className="flex items-center space-x-3">
                  <Switch
                    checked={symptoms.fever}
                    onCheckedChange={(checked) => setSymptoms({...symptoms, fever: checked})}
                  />
                  <Label>Fever</Label>
                  {symptoms.fever && (
                    <Input
                      placeholder="Temperature (°F)"
                      className="w-32"
                      value={symptoms.feverTemp}
                      onChange={(e) => setSymptoms({...symptoms, feverTemp: e.target.value})}
                    />
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Heart className="h-4 w-4 text-destructive" />
                  Cardiovascular/Respiratory
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Switch
                      checked={symptoms.chestPain}
                      onCheckedChange={(checked) => setSymptoms({...symptoms, chestPain: checked})}
                    />
                    <Label>Chest Pain</Label>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Switch
                      checked={symptoms.breathingDifficulty}
                      onCheckedChange={(checked) => setSymptoms({...symptoms, breathingDifficulty: checked})}
                    />
                    <Label>Breathing Difficulty</Label>
                  </div>
                </div>
              </div>
            </div>

            {/* Neurological Symptoms */}
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Brain className="h-4 w-4 text-primary" />
                Neurological Symptoms
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Switch
                    checked={symptoms.headache}
                    onCheckedChange={(checked) => setSymptoms({...symptoms, headache: checked})}
                  />
                  <Label>Headache</Label>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Switch
                    checked={symptoms.nausea}
                    onCheckedChange={(checked) => setSymptoms({...symptoms, nausea: checked})}
                  />
                  <Label>Nausea/Vomiting</Label>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="additional">Additional Symptoms & Observations</Label>
                <Textarea
                  id="additional"
                  placeholder="Describe any other symptoms, physical findings, or observations..."
                  value={symptoms.additionalSymptoms}
                  onChange={(e) => setSymptoms({...symptoms, additionalSymptoms: e.target.value})}
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="history">Medical History</Label>
                <Textarea
                  id="history"
                  placeholder="Previous conditions, surgeries, family history..."
                  value={symptoms.medicalHistory}
                  onChange={(e) => setSymptoms({...symptoms, medicalHistory: e.target.value})}
                  rows={2}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="medications">Current Medications</Label>
                <Input
                  id="medications"
                  placeholder="List current medications..."
                  value={symptoms.currentMedications}
                  onChange={(e) => setSymptoms({...symptoms, currentMedications: e.target.value})}
                />
              </div>
            </div>

            {/* File Upload */}
            <div className="space-y-2">
              <Label>Upload Medical Files (X-rays, Lab Results, etc.)</Label>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Click to upload or drag and drop medical files
                </p>
              </div>
            </div>

            {/* Analysis Progress */}
            {isAnalyzing && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span>Analyzing symptoms and searching medical literature...</span>
                  <span>{analysisProgress}%</span>
                </div>
                <Progress value={analysisProgress} className="h-2" />
                <div className="text-xs text-muted-foreground text-center">
                  Searching {Math.floor(analysisProgress * 1.27)} of 127 medical documents
                </div>
              </div>
            )}

            {/* Submit Button */}
            <Button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              variant="medical"
              size="lg"
              className="w-full"
            >
              {isAnalyzing ? (
                <>
                  <Activity className="h-5 w-5 mr-2 animate-pulse" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Search className="h-5 w-5 mr-2" />
                  Start Medical Analysis
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};