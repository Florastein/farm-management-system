# Farm Management System (FMS) Pro

A comprehensive web-based farm management application for monitoring and managing poultry and catfish operations. Built with React, TypeScript, and powered by Google Gemini AI for intelligent farm consulting.

## Features

- **Dashboard**: Real-time performance metrics including poultry count, pond statistics, revenue tracking, and active alerts
- **Poultry Module**: Monitor and manage poultry operations with detailed performance analytics
- **Catfish Module**: Track catfish pond operations and aquaculture metrics
- **Finance Module**: Manage farm finances, revenue, and expenses
- **AI Farm Consultant**: Get intelligent, data-driven farming advice using Google Gemini AI
- **Responsive Design**: Modern UI with Tailwind CSS for seamless experience on all devices
- **Data Visualization**: Interactive charts and graphs using Recharts for analytics

## Tech Stack

- **Frontend**: React 19.2.3 with TypeScript
- **Routing**: React Router 7.11.0
- **Build Tool**: Vite 6.2.0
- **Styling**: Tailwind CSS
- **Charts**: Recharts 3.6.0
- **AI**: Google Gemini API (@google/genai)

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Google Gemini API key

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd farm-management-system
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add your Gemini API key:
   ```
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

## Running the Application

### Development Mode

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Build for Production

Build the application:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Project Structure

```
farm-management-system/
├── components/
│   ├── FarmConsultant.tsx    # AI-powered farm consulting component
│   ├── Sidebar.tsx            # Navigation sidebar
│   └── StatCard.tsx           # Reusable statistics card component
├── pages/
│   ├── Dashboard.tsx          # Main dashboard with farm overview
│   ├── PoultryModule.tsx      # Poultry management interface
│   ├── CatfishModule.tsx      # Catfish/aquaculture management
│   └── FinanceModule.tsx      # Financial management and reporting
├── services/
│   └── geminiService.ts       # Google Gemini AI integration
├── App.tsx                    # Main application component
├── index.tsx                  # Application entry point
├── constants.tsx              # App-wide constants and icons
├── types.ts                   # TypeScript type definitions
├── vite.config.ts             # Vite configuration
└── README.md                  # This file
```

## Core Components

### Dashboard
The main overview page displaying key farm metrics:
- Total poultry count
- Number of ponds
- Month-to-date revenue
- Active alerts
- Performance analytics with charts

### Farm Consultant
AI-powered assistant that provides:
- Data-driven farming advice
- Recommendations based on farm context
- Answers to agricultural queries

### Modules
- **Poultry Module**: Track bird count, health, feed consumption, and mortality rates
- **Catfish Module**: Monitor pond conditions, fish weight, and aquaculture metrics
- **Finance Module**: Track revenue, expenses, and farm profitability

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_GEMINI_API_KEY` | Google Gemini API key for AI features | Yes |

## Getting a Gemini API Key

1. Visit [Google AI Studio](https://ai.google.dev/)
2. Sign in with your Google account
3. Create a new API key
4. Copy the key and add it to your `.env.local` file

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build application for production
- `npm run preview` - Preview production build locally

## Contributing

Contributions are welcome! Please follow the existing code style and ensure all components are TypeScript-compliant.

## License

MIT License

Copyright (c) 2025 Florastein

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Author

**Florastein** - [GitHub Profile](https://github.com/Florastein)

## Support

For issues or questions, please open an issue in the repository.
