import jwt from "jsonwebtoken"

// Autenticação baseada em token JWT e cookies HTTP-only

// Token é armazenado dentro do cookie, que por sua vez é armazenado no navegador, com proteção nativa deste
// Armazenar o cookie http-only é um alternativa mais segura que armazenar em localStorage (vunerável a ataques XSS)
// Armazenamento em cookies HTTP-only: feito para impedir que código javascript do navegador tenho acesso ao token (usa proteção nativa do navegador ao armazenar o cookie)

// Jwt é um token de autenticação, é uma string de texto codigicado que contém o id do usuário
const geradorToken = (res, userId) => {
        const token = jwt.sign(
            // Payload
            {id: userId },
            
            // Signature
            process.env.JWT_SECRET,
            
            // Options (configurações)
            {expiresIn: '1d'}
        );


    const isProduction = process.env.NODE_ENV === "production";

    // cookie() é um método do express para facilitar envio de cookies no header http
    // envia o token em um cookie HTTP-only
    
    res.cookie("jwt", token, {
        // Faz o cookie ser acessível apenas no servidor web
        httpOnly: true,
        
        // Flag que exige HTTPS, para aplicação em produção
        // Essa flag protege informações no cookie, instrui o9 navefador a nunca enviar o cookie de volta ao servidor se a conezão for HTTP (ambiente desenvolvimento )
        secure: isProduction,
        
        // Strict mais seguro, o cookie só é enviado em requisições no mesmo site onde o cookie foi definido
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000, // 1 dias em milissegundos

    });

};

export default geradorToken;