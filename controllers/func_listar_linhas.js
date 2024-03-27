 // Assuming MySQL database
import { db } from "../db.js";

const queryListar = "SELECT id_producao, status_producao FROM producao_linha"; // Replace with your actual query

export const getLinhasListadass = (req, res) => {
    db.query(queryListar, (error, results) => {
        if (error) throw error;
        
        for (const row of results) {
            const id_producao = row.id_producao;
            let status_producao = 'Em produção';
        
            if (row.status_producao === 1) {
            status_producao = 'Em Andamento';
            } else if (row.status_producao === 0) {
            status_producao = 'Aguandando 1º lançamento';
            }
        
            // Create and render a button element (using a library like React for UI)
            const buttonText = `ID PRODUÇÃO: ${id_producao}, Status: ${status_producao}`;
            const buttonStyle = {
            // Set appropriate styles using a CSS framework or inline styles
            };
        
            const buttonElement = createButton(buttonText, buttonStyle); // Implement createButton function for UI rendering
            // Add buttonElement to your UI layout
        }
    });

};
