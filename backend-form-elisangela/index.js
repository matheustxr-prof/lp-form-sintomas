const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Serve static files from the React frontend build folder
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

async function enviarEmailBackend(formData) {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "",
        pass: "",
      },
    });

    const recurrenceOptions = {
      ausentes: { label: "Ausentes", score: 0 },
      ocasional: { label: "Ocasional (até 5 p/ dia)", score: 1 },
      frequentes: { label: "Frequentes (5-10 p/ dia)", score: 2 },
      muitoFrequentes: { label: "Muito Frequentes (mais de 10 p/ dia)", score: 3 },
    };

    const symptomLabels = formData.symptomLabels;

    const htmlContent = `
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
        }
        h1 {
          color: #333;
        }
        ul {
          list-style: none;
          padding-left: 0;
        }
        li {
          margin-bottom: 20px;
          border: 1px solid #ddd;
          padding: 15px;
          background-color: #f9f9f9;
          border-radius: 5px;
          box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
        }
        strong {
          font-weight: bold;
        }
      </style>
      <h1>Relatório de Sintomas</h1>
      <p>Nome do usuário: ${formData.nome}</p>
      <p>Sintomas:</p>
      <ul>
        ${formData.sintomas
          .map((sintoma) => {
            const symptomLabels = Object.keys(sintoma).filter(
              (key) => key !== "data" && key !== "recorrencia" && sintoma[key]
            );

            return `
            <li>
            <strong>Data:</strong> ${sintoma.data}<br>
            ${symptomLabels
              .map((symptomLabel) => {
                const symptomRecurrenceKey = `${formData.sintomas.indexOf(
                  sintoma
                )}_${symptomLabel}`;
                const recurrenceOptionKey =
                  formData.recurrenceStates[symptomRecurrenceKey];
                const recurrenceText = recurrenceOptionKey
                  ? `, ${recurrenceOptions[recurrenceOptionKey].label}`
                  : "";
                  const recurrenceScore = recurrenceOptionKey
                  ? `${recurrenceOptions[recurrenceOptionKey].score}`
                  : "";
                return `<strong>${symptomLabel}:</strong> Sim${recurrenceText}<br> <strong>Score:</strong> ${recurrenceScore}<br>`;
              })
              .join("")}
          </li>
            `;
          })
          .join("")}
      </ul>
`;

    // Agora você pode utilizar o htmlContent para enviar o e-mail.

    let info = await transporter.sendMail({
      from: "",
      to: [], //"draelisangelamenezes@gmail.com", "contas@bmouseproductions.com"
      subject: "Relatório de sintomas",
      html: htmlContent,
    });

    console.log("Email sent: %s", info.messageId);
  } catch (err) {
    console.error(err);
  }
}

app.post("/send", async (req, res) => {
  const formData = req.body;

  try {
    await enviarEmailBackend(formData);

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json({ msg: "Email enviado com sucesso" });
  } catch (error) {
    console.error("Erro ao enviar o email", error);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(500).json({ error: "Erro ao enviar o email" });
  }
});

app.listen(3001, function () {
  console.log("Server running on port 3001");
});
