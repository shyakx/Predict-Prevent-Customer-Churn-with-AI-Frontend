
import React, { useState } from 'react';
import { BarChart3, Users, Brain, Upload, Phone, Code2, Database, Shield, Cpu, LineChart, Zap } from 'lucide-react';

interface PredictionInput {
  account_length: number;
  international_plan: string;
  voice_mail_plan: string;
  total_day_minutes: number;
  total_eve_minutes: number;
  total_night_minutes: number;
  total_intl_minutes: number;
}

function App() {
  const [showPredictPopup, setShowPredictPopup] = useState(false);
  const [showRetrainPopup, setShowRetrainPopup] = useState(false);
  const [predictionResult, setPredictionResult] = useState<any>(null);
  const [retrainResult, setRetrainResult] = useState<any>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [predictInput, setPredictInput] = useState<PredictionInput>({
    account_length: 0,
    international_plan: 'No',
    voice_mail_plan: 'No',
    total_day_minutes: 0,
    total_eve_minutes: 0,
    total_night_minutes: 0,
    total_intl_minutes: 0,
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

  const handleRetrainSubmit = async (e: React.FormEvent) => {
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
      {/* ... Previous header content remains the same until buttons ... */}
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
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Predict Churn</h2>
            <form onSubmit={handlePredictSubmit} className="space-y-4">
              <input
                type="number"
                placeholder="Account Length"
                value={predictInput.account_length}
                onChange={(e) => setPredictInput({ ...predictInput, account_length: Number(e.target.value) })}
                className="w-full p-2 border rounded"
                required
              />
              <select
                value={predictInput.international_plan}
                onChange={(e) => setPredictInput({ ...predictInput, international_plan: e.target.value })}
                className="w-full p-2 border rounded"
              >
                <option value="No">No International Plan</option>
                <option value="Yes">Yes International Plan</option>
              </select>
              <select
                value={predictInput.voice_mail_plan}
                onChange={(e) => setPredictInput({ ...predictInput, voice_mail_plan: e.target.value })}
                className="w-full p-2 border rounded"
              >
                <option value="No">No Voice Mail</option>
                <option value="Yes">Yes Voice Mail</option>
              </select>
              <input
                type="number"
                placeholder="Total Day Minutes"
                value={predictInput.total_day_minutes}
                onChange={(e) => setPredictInput({ ...predictInput, total_day_minutes: Number(e.target.value) })}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="number"
                placeholder="Total Evening Minutes"
                value={predictInput.total_eve_minutes}
                onChange={(e) => setPredictInput({ ...predictInput, total_eve_minutes: Number(e.target.value) })}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="number"
                placeholder="Total Night Minutes"
                value={predictInput.total_night_minutes}
                onChange={(e) => setPredictInput({ ...predictInput, total_night_minutes: Number(e.target.value) })}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="number"
                placeholder="Total International Minutes"
                value={predictInput.total_intl_minutes}
                onChange={(e) => setPredictInput({ ...predictInput, total_intl_minutes: Number(e.target.value) })}
                className="w-full p-2 border rounded"
                required
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowPredictPopup(false)}
                  className="px-4 py-2 bg-gray-200 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 bg-[#0066CC] text-white rounded disabled:opacity-50"
                >
                  {isLoading ? 'Predicting...' : 'Predict'}
                </button>
              </div>
            </form>
            {predictionResult && (
              <div className="mt-4 p-4 bg-gray-100 rounded">
                <p>Churn Probability: {(predictionResult.churn_probability * 100).toFixed(2)}%</p>
                <p>Prediction: {predictionResult.churn_prediction ? 'Will Churn' : 'Won\'t Churn'}</p>
                {predictionResult.error && <p className="text-red-500">{predictionResult.error}</p>}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Retrain Popup */}
      {showRetrainPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
            <h2 className="text-2xl font-bold mb-4">Retrain Model</h2>
            <form onSubmit={handleRetrainSubmit} className="space-y-4">
              <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="w-full p-2 border rounded"
                required
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowRetrainPopup(false)}
                  className="px-4 py-2 bg-gray-200 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading || !selectedFile}
                  className="px-4 py-2 bg-[#0066CC] text-white rounded disabled:opacity-50"
                >
                  {isLoading ? 'Retraining...' : 'Retrain'}
                </button>
              </div>
            </form>
            {retrainResult && (
              <div className="mt-4 space-y-4">
                {retrainResult.error ? (
                  <p className="text-red-500">{retrainResult.error}</p>
                ) : (
                  <>
                    <div className="p-4 bg-gray-100 rounded">
                      <p>Accuracy: {(retrainResult.metrics.accuracy * 100).toFixed(2)}%</p>
                      <p>Precision: {(retrainResult.metrics.precision * 100).toFixed(2)}%</p>
                      <p>Recall: {(retrainResult.metrics.recall * 100).toFixed(2)}%</p>
                      <p>F1 Score: {(retrainResult.metrics.f1_score * 100).toFixed(2)}%</p>
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

      {/* ... Rest of the sections remain the same ... */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center">
              <div className="bg-[#0066CC] p-4 rounded-full text-white mb-6">
                <Brain className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Advanced ML Model</h3>
              <p className="text-gray-600">
                Utilizing state-of-the-art machine learning algorithms to predict customer behavior.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-[#0066CC] p-4 rounded-full text-white mb-6">
                <BarChart3 className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Real-time Analytics</h3>
              <p className="text-gray-600">
                Get instant insights and predictions based on your customer data.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-[#0066CC] p-4 rounded-full text-white mb-6">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Customer Retention</h3>
              <p className="text-gray-600">
                Take proactive measures to retain valuable customers before they churn.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
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

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">Powered by Advanced Technology</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Brain className="h-6 w-6 text-[#0066CC]" />
                </div>
                <h3 className="text-xl font-semibold ml-4">TensorFlow</h3>
              </div>
              <p className="text-gray-600">Deep learning framework for building and training neural networks</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Code2 className="h-6 w-6 text-[#0066CC]" />
                </div>
                <h3 className="text-xl font-semibold ml-4">Python</h3>
              </div>
              <p className="text-gray-600">High-performance backend with FastAPI for real-time predictions</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Database className="h-6 w-6 text-[#0066CC]" />
                </div>
                <h3 className="text-xl font-semibold ml-4">PostgreSQL</h3>
              </div>
              <p className="text-gray-600">Scalable database for secure customer data management</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Shield className="h-6 w-6 text-[#0066CC]" />
                </div>
                <h3 className="text-xl font-semibold ml-4">Enterprise Security</h3>
              </div>
              <p className="text-gray-600">End-to-end encryption and compliance with data protection standards</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Cpu className="h-6 w-6 text-[#0066CC]" />
                </div>
                <h3 className="text-xl font-semibold ml-4">GPU Acceleration</h3>
              </div>
              <p className="text-gray-600">High-performance computing for rapid model training and inference</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <LineChart className="h-6 w-6 text-[#0066CC]" />
                </div>
                <h3 className="text-xl font-semibold ml-4">Advanced Analytics</h3>
              </div>
              <p className="text-gray-600">Real-time visualization and reporting dashboard</p>
            </div>
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
