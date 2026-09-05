// Industrial Luxury style reminder: route composition is intentionally calm and modular—shared chrome stays stable while each specialist workspace gets its own surface.
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import Home from "@/pages/Home";
import Products from "@/pages/Products";
import Tools from "@/pages/Tools";
import News from "@/pages/News";
import Visualizer from "@/pages/Visualizer";
import Mixer from "@/pages/Mixer";
import BS4800 from "@/pages/BS4800";
import About from "@/pages/About";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import SiteShell from "./components/SiteShell";
import { ThemeProvider } from "./contexts/ThemeContext";
import { CartProvider } from "./contexts/CartContext";

function Router() {
  return (
    <SiteShell>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/products" component={Products} />
        <Route path="/tools" component={Tools} />
        <Route path="/visualizer" component={Visualizer} />
        <Route path="/tools/visualizer" component={Visualizer} />
        <Route path="/mixer" component={Mixer} />
        <Route path="/tools/mixer" component={Mixer} />
        <Route path="/bs-4800" component={BS4800} />
        <Route path="/palette" component={BS4800} />
        <Route path="/tools/palette" component={BS4800} />
        <Route path="/news" component={News} />
        <Route path="/about" component={About} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </SiteShell>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light" switchable>
        <CartProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </CartProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
