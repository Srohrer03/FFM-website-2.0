import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import StatsSection from './components/StatsSection';
import SecuritySection from './components/SecuritySection';
import CostCalculator from './components/CostCalculator';
import PlatformPreview from './components/PlatformPreview';
import ValuePropositions from './components/ValuePropositions';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import ClientPortal from './components/ClientPortal';
import VendorPortal from './components/VendorPortal';
import OnboardingModal from './components/OnboardingModal';
import VendorOnboardingModal from './components/VendorOnboardingModal';
import BackToTop from './components/BackToTop';
import WorkOrderSystem from './components/WorkOrderSystem';
import WorkOrderWalkthrough from './components/WorkOrderWalkthrough';
import EscrowManagement from './components/EscrowManagement';
import PreventativeMaintenanceSystem from './components/PreventativeMaintenanceSystem';
import IoTMonitoringSystem from './components/IoTMonitoringSystem';
import FFMAdminPortal from './components/FFMAdminPortal';
import RMBudgetTracker from './components/RMBudgetTracker';
import DocumentManagementSystem from './components/DocumentManagementSystem';
import AssetLifecycleManagement from './components/AssetLifecycleManagement';
import TenantRepairInterface from './components/TenantRepairInterface';
import TrackableHistorySystem from './components/TrackableHistorySystem';
import FacilityHealthReports from './components/FacilityHealthReports';
import KnowledgeBaseLibrary from './components/KnowledgeBaseLibrary';
import AIVendorOptimization from './components/AIVendorOptimization';
import StrategicAdvisorySystem from './components/StrategicAdvisorySystem';
import FacilityWalkthroughApp from './components/FacilityWalkthroughApp';
import TrustedVendorBadgeSystem from './components/TrustedVendorBadgeSystem';
import CapExWorkspace from './components/CapExWorkspace';
import MultiTenantRollupView from './components/MultiTenantRollupView';
import UserSupportSystem from './components/UserSupportSystem';
import ScopeBuilder from './components/ScopeBuilder';
import MyBids from './components/MyBids';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-900 text-gray-100">
        <Routes>
          <Route path="/client-portal" element={<ClientPortal />} />
          <Route path="/vendor-portal" element={<VendorPortal />} />
          <Route path="/work-orders" element={<WorkOrderSystem />} />
          <Route path="/work-order-walkthrough" element={<WorkOrderWalkthrough />} />
          <Route path="/escrow-management" element={<EscrowManagement />} />
          <Route path="/preventative-maintenance" element={<PreventativeMaintenanceSystem />} />
          <Route path="/iot-monitoring" element={<IoTMonitoringSystem />} />
          <Route path="/ffm-admin" element={<FFMAdminPortal />} />
          <Route path="/rm-budget-tracker" element={<RMBudgetTracker />} />
          <Route path="/document-management" element={<DocumentManagementSystem />} />
          <Route path="/asset-lifecycle" element={<AssetLifecycleManagement />} />
          <Route path="/tenant-repair" element={<TenantRepairInterface />} />
          <Route path="/trackable-history" element={<TrackableHistorySystem />} />
          <Route path="/facility-health-reports" element={<FacilityHealthReports />} />
          <Route path="/knowledge-base" element={<KnowledgeBaseLibrary />} />
          <Route path="/ai-vendor-optimization" element={<AIVendorOptimization />} />
          <Route path="/strategic-advisory" element={<StrategicAdvisorySystem />} />
          <Route path="/facility-walkthrough" element={<FacilityWalkthroughApp />} />
          <Route path="/trusted-vendor-badges" element={<TrustedVendorBadgeSystem />} />
          <Route path="/capex-workspace" element={<CapExWorkspace />} />
          <Route path="/multi-tenant-rollup" element={<MultiTenantRollupView />} />
          <Route path="/user-support" element={<UserSupportSystem />} />
          <Route path="/scope-builder" element={<ScopeBuilder />} />
          <Route path="/my-bids" element={<MyBids />} />
          <Route path="/" element={
            <>
              <Header />
              <Hero />
              <StatsSection />
              <SecuritySection />
              <CostCalculator />
              <PlatformPreview />
              <ValuePropositions />
              <Testimonials />
              <FAQ />
              <Newsletter />
              <Footer />
              <OnboardingModal />
              <VendorOnboardingModal />
              <BackToTop />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;