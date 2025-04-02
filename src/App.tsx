import React, { useState } from 'react';
import { BarChart3, Users, Brain, Upload, Phone, Code2, Database, Shield, Cpu, LineChart, Zap } from 'lucide-react';

interface PredictionInput {
  account_length: number | string;
  international_plan: string;
  voice_mail_plan: string;
  total_day_minutes: number | string;
  total_eve_minutes: number | string;
  total_night_minutes: number | string;
  total_intl_minutes: number | string;
}

function App() {
  const [showPredictPopup, setShowPredictPopup] = useState(false);
  const [showRetrainPopup, setShowRetrainPopup] = useState(false);
  const [predictionResult, setPredictionResult] = useState<any>(null);
  const [retrainResult, setRetrainResult] = useState<any>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [predictInput, setPredictInput] = useState<PredictionInput>({
    account_length: '',
    international_plan: 'No',
    voice_mail_plan: 'No',
    total_day_minutes: '',
    total_eve_minutes: '',
    total_night_minutes: '',
    total_intl_minutes: '',
  });

  const handlePredictSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('https://telecom-api.onrender.com/predict_churn/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(predictInput),
      });
      const data = await response.json();
      setPredictionResult(data);
    } catch (error) {
      console.error('Prediction error:', error);
      setPredictionResult({ error: 'Failed to get prediction' });
    }
    setIsLoading(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleRetrainSubmit = async (e: RetrainPopup) => {
    e.preventDefault();
    if (!selectedFile) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('https://telecom-api.onrender.com/retrain_model/', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setRetrainResult(data);
    } catch (error) {
      console.error('Retrain error:', error);
      setRetrainResult({ error: 'Failed to retrain model' });
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-gradient-to-r from-[#0066CC] to-[#00A2FF] text-white">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Phone className="h-8 w-8" />
            <span className="text-2xl font-bold">TelePredict</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#problem" className="hover:text-blue-200">Problem</a>
            <a href="#solution" className="hover:text-blue-200">Solution</a>
            <a href="#demo" className="hover:text-blue-200">Demo</a>
            <a href="#insights" className="hover:text-blue-200">Insights</a>
            <a href="#contact" className="hover:text-blue-200">Contact</a>
          </div>
        </nav>
        
        <div className="container mx-auto px-6 py-24">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">
              Predict & Prevent Customer Churn with AI
            </h1>
            <p className="text-xl mb-8">
              Our advanced machine learning model helps telecom companies retain customers 
              by predicting churn with up to 95% accuracy.
            </p>
            <div className="flex space-x-4">
              <button 
                onClick={() => setShowPredictPopup(true)}
                className="bg-white text-[#0066CC] px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
              >
                Predict Now
              </button>
              <button 
                onClick={() => setShowRetrainPopup(true)}
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition"
              >
                Retrain Now
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Prediction Popup */}
      {showPredictPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-2 rounded-lg w-full max-w-xs">
            <h2 className="text-base font-bold mb-1">Predict Churn</h2>
            <form onSubmit={handlePredictSubmit} className="space-y-0.5">
              <div>
                <label className="block text-[10px] font-medium text-gray-700 mb-0.5">Account Length</label>
                <input
                  type="number"
                  placeholder="128"
                  value={predictInput.account_length || ''}
                  onChange={(e) => setPredictInput({ ...predictInput, account_length: Number(e.target.value) })}
                  className="w-full p-1 border rounded text-xs [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-medium text-gray-700 mb-0.5">International Plan</label>
                <select
                  value={predictInput.international_plan}
                  onChange={(e) => setPredictInput({ ...predictInput, international_plan: e.target.value })}
                  className="w-full p-1 border rounded text-xs"
                >
                  <option value="No">No International Plan</option>
                  <option value="Yes">Yes International Plan</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-medium text-gray-700 mb-0.5">Voice Mail Plan</label>
                <select
                  value={predictInput.voice_mail_plan}
                  onChange={(e) => setPredictInput({ ...predictInput, voice_mail_plan: e.target.value })}
                  className="w-full p-1 border rounded text-xs"
                >
                  <option value="No">No Voice Mail</option>
                  <option value="Yes">Yes Voice Mail</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-medium text-gray-700 mb-0.5">Total Day Minutes</label>
                <input
                  type="number"
                  placeholder="265.1"
                  value={predictInput.total_day_minutes || ''}
                  onChange={(e) => setPredictInput({ ...predictInput, total_day_minutes: Number(e.target.value) })}
                  className="w-full p-1 border rounded text-xs [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-medium text-gray-700 mb-0.5">Total Evening Minutes</label>
                <input
                  type="number"
                  placeholder="197.4"
                  value={predictInput.total_eve_minutes || ''}
                  onChange={(e) => setPredictInput({ ...predictInput, total_eve_minutes: Number(e.target.value) })}
                  className="w-full p-1 border rounded text-xs [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-medium text-gray-700 mb-0.5">Total Night Minutes</label>
                <input
                  type="number"
                  placeholder="244.7"
                  value={predictInput.total_night_minutes || ''}
                  onChange={(e) => setPredictInput({ ...predictInput, total_night_minutes: Number(e.target.value) })}
                  className="w-full p-1 border rounded text-xs [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-medium text-gray-700 mb-0.5">Total International Minutes</label>
                <input
                  type="number"
                  placeholder="10.0"
                  value={predictInput.total_intl_minutes || ''}
                  onChange={(e) => setPredictInput({ ...predictInput, total_intl_minutes: Number(e.target.value) })}
                  className="w-full p-1 border rounded text-xs [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  required
                />
              </div>
              <div className="flex justify-end space-x-1 mt-1">
                <button
                  type="button"
                  onClick={() => setShowPredictPopup(false)}
                  className="px-2 py-0.5 bg-gray-200 rounded text-[10px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-2 py-0.5 bg-[#0066CC] text-white rounded text-[10px] disabled:opacity-50"
                >
                  {isLoading ? 'Predicting...' : 'Predict'}
                </button>
              </div>
            </form>
            {predictionResult && (
              <div className="mt-1 p-1 bg-gray-100 rounded">
                <p className="text-[10px]">Churn Probability: {(predictionResult.churn_probability * 100).toFixed(2)}%</p>
                <p className="text-[10px]">Prediction: {predictionResult.churn_prediction ? 'Will Churn' : 'Won\'t Churn'}</p>
                {predictionResult.error && <p className="text-red-500 text-[10px]">{predictionResult.error}</p>}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Retrain Popup */}
      {showRetrainPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-2 rounded-lg w-full max-w-md">
            <h2 className="text-base font-bold mb-1">Retrain Model</h2>
            <form onSubmit={handleRetrainSubmit} className="space-y-0.5">
              <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="w-full p-1 border rounded text-xs"
                required
              />
              <div className="flex justify-end space-x-1 mt-1">
                <button
                  type="button"
                  onClick={() => setShowRetrainPopup(false)}
                  className="px-2 py-0.5 bg-gray-200 rounded text-[10px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading || !selectedFile}
                  className="px-2 py-0.5 bg-[#0066CC] text-white rounded text-[10px] disabled:opacity-50"
                >
                  {isLoading ? 'Retraining...' : 'Retrain'}
                </button>
              </div>
            </form>
            {retrainResult && (
              <div className="mt-1 space-y-0.5">
                {retrainResult.error ? (
                  <p className="text-red-500 text-[10px]">{retrainResult.error}</p>
                ) : (
                  <>
                    <div className="p-1 bg-gray-100 rounded">
                      <p className="text-[10px]">Accuracy: {(retrainResult.metrics.accuracy * 100).toFixed(2)}%</p>
                      <p className="text-[10px]">Precision: {(retrainResult.metrics.precision * 100).toFixed(2)}%</p>
                      <p className="text-[10px]">Recall: {(retrainResult.metrics.recall * 100).toFixed(2)}%</p>
                      <p className="text-[10px]">F1 Score: {(retrainResult.metrics.f1_score * 100).toFixed(2)}%</p>
                    </div>
                    {retrainResult.plot && (
                      <img
                        src={retrainResult.plot}
                        alt="Training Metrics"
                        className="w-full rounded"
                      />
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Problem Section */}
      <section id="problem" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-8">The Churn Challenge</h2>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-gray-600 mb-6">
              Telecom companies face significant revenue loss due to customer churn. 
              Traditional methods of identifying at-risk customers are often too late or inaccurate, 
              leading to missed opportunities for retention.
            </p>
            <p className="text-gray-600">
              High churn rates can cost millions annually, making it critical to predict and 
              prevent customer departure proactively.
            </p>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-8">Our AI-Powered Solution</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold mb-4">Predictive Analytics</h3>
              <p className="text-gray-600">
                Our machine learning model analyzes customer data to predict churn probability 
                with high accuracy, allowing you to take action before customers leave.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Actionable Insights</h3>
              <p className="text-gray-600">
                Get detailed reports and recommendations to improve customer retention 
                strategies based on real-time data analysis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-8">See It In Action</h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-center text-gray-600 mb-6">
              Try our live demo to experience how TelePredict can transform your customer 
              retention strategy. Upload your data or use our sample dataset to see instant results.
            </p>
            <div className="flex justify-center space-x-4">
              <button 
                onClick={() => setShowPredictPopup(true)}
                className="bg-[#0066CC] text-white px-6 py-2 rounded-lg hover:bg-[#0055AA]"
              >
                Try Prediction
              </button>
              <button 
                onClick={() => setShowRetrainPopup(true)}
                className="border-2 border-[#0066CC] text-[#0066CC] px-6 py-2 rounded-lg hover:bg-blue-50"
              >
                Retrain Model
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Insights Section */}
      <section id="insights" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-8">Key Insights</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#0066CC] mb-2">95%</div>
              <div className="text-gray-600">Prediction Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#0066CC] mb-2">30%</div>
              <div className="text-gray-600">Churn Reduction</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#0066CC] mb-2">1M+</div>
              <div className="text-gray-600">Predictions Made</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-8">Get In Touch</h2>
          <div className="max-w-md mx-auto">
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-2 border rounded"
                required
              />
              <textarea
                placeholder="Your Message"
                className="w-full p-2 border rounded h-32"
                required
              />
              <button
                type="submit"
                className="w-full bg-[#0066CC] text-white p-2 rounded hover:bg-[#0055AA]"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-[#0066CC] to-[#00A2FF]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Experience the Power of AI
              </h2>
              <p className="text-xl text-blue-100 mb-6">
                Upload your data and see how our model can predict customer churn in real-time. 
                Start making data-driven decisions today.
              </p>
              <div className="flex space-x-4">
                <button className="bg-white text-[#0066CC] px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition flex items-center">
                  <Upload className="h-5 w-5 mr-2" />
                  Upload Dataset
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition flex items-center">
                  <Zap className="h-5 w-5 mr-2" />
                  Live Demo
                </button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=500" 
                alt="Analytics Dashboard" 
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Phone className="h-6 w-6" />
              <span className="text-xl font-bold">TelePredict</span>
            </div>
            <div className="text-sm text-gray-400">
              © 2025 TelePredict. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;