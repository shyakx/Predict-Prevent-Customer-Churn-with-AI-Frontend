import React from 'react';
import { BarChart3, Users, Brain, Upload, Phone, Code2, Database, Shield, Cpu, LineChart, Zap } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
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
              <button className="bg-white text-[#0066CC] px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition">
                Predict Now
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition">
                Retrain
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Key Features */}
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

      {/* Stats Section */}
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

      {/* Technology Stack */}
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

      {/* Demo CTA */}
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

      {/* Footer */}
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