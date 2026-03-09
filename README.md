# Headless E-Commerce Architecture: Next.js & GraphQL API

## Overview
This project implements a decoupled, production-grade e-commerce architecture. By isolating the frontend presentation layer from the backend content management system, the system achieves superior scalability, security, and performance.

The infrastructure consists of a custom-provisioned cloud environment, ensuring granular control over server configurations, firewall policies, and API delivery.

## Engineering Stack

### Frontend (Client Layer)
- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Data Fetching:** Native Fetch API with optimized cache invalidation strategies
- **Hosting:** Vercel

### Backend (Data API Layer)
- **Engine:** Headless WordPress & WooCommerce
- **API Protocol:** WPGraphQL (Optimized for precise JSON payloads to minimize over-fetching)
- **Authentication:** GraphQL endpoints secured via Let's Encrypt SSL/TLS

### Infrastructure (Server Layer)
- **Cloud Provider:** Oracle Cloud Infrastructure
- **Operating System:** Ubuntu Linux
- **Web Server:** Nginx configured as a Reverse Proxy
- **Runtime:** PHP 8.3 (FPM)
- **Database:** MySQL
- **Security:** Hardened iptables, Oracle Cloud Subnet Ingress rules, and Automated SSL management via Certbot

## Architectural Implementation Details

1. **GraphQL Data Orchestration:** The implementation utilizes WPGraphQL to facilitate precise data retrieval. The Next.js frontend requests specific nodes (e.g., product attributes, pricing, and media URLs), significantly reducing payload size compared to standard REST architectures.
2. **Infrastructure Optimization:** The backend is hosted on a manually tuned Linux instance. Optimization steps included swap memory allocation for memory stability, Nginx body limit tuning for high-payload operations, and PHP execution parameter adjustments for sustained data throughput.
3. **Decoupled Security Model:** The CMS and database layers are logically and physically separated from the distribution layer. Communication is restricted to authenticated GraphQL queries over encrypted channels.

## Local Development

### Prerequisites
- Node.js 18.x or higher
- npm or yarn package manager

### 1. Repository Setup
```bash
git clone https://github.com/Emjaay20/Gadegt-Store.git
cd Gadegt-Store
```

### 2. Environment Configuration
Create a `.env.local` file in the root directory and define the following variables:

```env
NEXT_PUBLIC_WC_GRAPHQL_URL=https://technoir-hub.duckdns.org/graphql
NEXT_PUBLIC_WC_STORE_URL=https://technoir-hub.duckdns.org
WC_CONSUMER_KEY=your_consumer_key
WC_CONSUMER_SECRET=your_consumer_secret
```

### 3. Installation & Execution
```bash
npm install
npm run dev
```
The application will be accessible at `http://localhost:3000`.

---
**Architect**
Yusuf Abubakar Saka
B2B Product Consultant & Solutions Architect
