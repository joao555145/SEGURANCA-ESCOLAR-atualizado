//chat-ia.js

async function enviarPerguntaIA() {

  const input =
    document.getElementById(
      "pergunta"
    );

  const area =
    document.getElementById(
      "ia-area"
    );

  const pergunta =  
    input.value.trim();

  if (!pergunta) return;

  area.innerHTML += `
    <p>
      <b>Você:</b>
      ${pergunta}
    </p>
  `;

  input.value = "";

  area.innerHTML += `
    <p id="digitando">
      <b>IA:</b>
      Pensando...
    </p>
  `;

  try {

    const resposta = await fetch(

      "https://api.groq.com/openai/v1/chat/completions",

      {

        method: "POST",

        headers: {

          "Content-Type":
            "application/json",

          "Authorization":
            "Bearer "

        },

        body: JSON.stringify({

          messages: [

            {

              role: "system",

              content:
                "Você é um assistente de tecnologia que responde de forma curta, simples, direta e resumida. Responda em poucas linhas, e lembre-se de forma curta e bem resumida."

            },

            {

              role: "user",

              content: pergunta

            }

          ],

          model:
            "llama-3.1-8b-instant"

        })

      }

    );

    const data =
      await resposta.json();

    console.log(data);

    document
      .getElementById(
        "digitando"
      )
      .remove();

    if (!data.choices) {

      area.innerHTML += `
        <p style="color:red;">
          ${JSON.stringify(data)}
        </p>
      `;

      return;

    }

    const texto =

      data.choices[0]
      .message.content;

    area.innerHTML += `
      <p>
        <b>IA:</b>
        ${texto}
      </p>
    `;

  }

  catch (erro) {

    console.error(erro);

    area.innerHTML += `
      <p style="color:red;">
        Erro ao conectar IA.
      </p>
    `;

  }

}

