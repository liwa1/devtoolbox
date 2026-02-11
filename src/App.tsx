import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { PremiumProvider } from "./contexts/PremiumContext";
import { PaywallModal } from "./components/Premium";
import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import PaymentSuccess from "./pages/PaymentSuccess";
import NotFound from "./pages/NotFound";

// Free Tools
import JsonFormatter from "./tools/JsonFormatter";
import Base64Tool from "./tools/Base64Tool";
import UrlEncoderTool from "./tools/UrlEncoderTool";
import HashGenerator from "./tools/HashGenerator";
import UuidGenerator from "./tools/UuidGenerator";
import LoremIpsum from "./tools/LoremIpsum";
import ColorConverter from "./tools/ColorConverter";
import RegexTester from "./tools/RegexTester";
import JwtDecoder from "./tools/JwtDecoder";
import MarkdownPreview from "./tools/MarkdownPreview";
import TimestampConverter from "./tools/TimestampConverter";
import PasswordGenerator from "./tools/PasswordGenerator";
import HtmlEntities from "./tools/HtmlEntities";
import CssMinifier from "./tools/CssMinifier";
import QrCodeGenerator from "./tools/QrCodeGenerator";
import SqlFormatter from "./tools/SqlFormatter";

// Premium Tools
import NumberBaseConverter from "./tools/NumberBaseConverter";
import TextAnalyzer from "./tools/TextAnalyzer";
import CaseConverter from "./tools/CaseConverter";
import TextDiff from "./tools/TextDiff";
import JsonCsvConverter from "./tools/JsonCsvConverter";
import CronParser from "./tools/CronParser";
import JsonYamlConverter from "./tools/JsonYamlConverter";
import WhatIsMyInfo from "./tools/WhatIsMyInfo";

export default function App() {
  return (
    <PremiumProvider>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/payment/success" element={<PaymentSuccess />} />
            {/* Free Tools */}
            <Route path="/json-formatter" element={<JsonFormatter />} />
            <Route path="/base64" element={<Base64Tool />} />
            <Route path="/url-encoder" element={<UrlEncoderTool />} />
            <Route path="/hash-generator" element={<HashGenerator />} />
            <Route path="/uuid-generator" element={<UuidGenerator />} />
            <Route path="/lorem-ipsum" element={<LoremIpsum />} />
            <Route path="/color-converter" element={<ColorConverter />} />
            <Route path="/regex-tester" element={<RegexTester />} />
            <Route path="/jwt-decoder" element={<JwtDecoder />} />
            <Route path="/markdown-preview" element={<MarkdownPreview />} />
            <Route path="/timestamp-converter" element={<TimestampConverter />} />
            <Route path="/password-generator" element={<PasswordGenerator />} />
            <Route path="/html-entities" element={<HtmlEntities />} />
            <Route path="/css-minifier" element={<CssMinifier />} />
            <Route path="/qrcode-generator" element={<QrCodeGenerator />} />
            <Route path="/sql-formatter" element={<SqlFormatter />} />
            {/* Premium Tools */}
            <Route path="/number-base-converter" element={<NumberBaseConverter />} />
            <Route path="/text-analyzer" element={<TextAnalyzer />} />
            <Route path="/case-converter" element={<CaseConverter />} />
            <Route path="/text-diff" element={<TextDiff />} />
            <Route path="/json-csv" element={<JsonCsvConverter />} />
            <Route path="/cron-parser" element={<CronParser />} />
            <Route path="/json-yaml" element={<JsonYamlConverter />} />
            <Route path="/my-info" element={<WhatIsMyInfo />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <PaywallModal />
      </div>
    </PremiumProvider>
  );
}
