import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Authentication API
  app.post("/api/auth/login", (req, res) => {
    const { password } = req.body;
    
    if (password === "Nhayydzvcl") {
      res.json({ success: true });
    } else {
      res.status(401).json({ 
        success: false, 
        message: "Mật khẩu không đúng" 
      });
    }
  });
  
  // Prediction statistics API
  app.post("/api/prediction/record", (req, res) => {
    const { prediction, result } = req.body;
    
    // Validate input
    if (!prediction || !result) {
      return res.status(400).json({ 
        success: false, 
        message: "Missing required fields" 
      });
    }
    
    // We could store these stats in a database here if needed
    
    res.json({ success: true });
  });

  const httpServer = createServer(app);

  return httpServer;
}
