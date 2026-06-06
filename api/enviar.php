<?php
// Permitir requisições Cross-Origin (CORS) caso o front esteja em domínio diferente durante testes.
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Retornar sempre JSON
header('Content-Type: application/json');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'lib/PHPMailer/Exception.php';
require 'lib/PHPMailer/PHPMailer.php';
require 'lib/PHPMailer/SMTP.php';

try {
    // Receber os dados do Corpo da Requisição (POST JSON)
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    if (!$data) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Nenhum dado recebido."]);
        exit();
    }

    // Validações básicas (Ex: WhatsApp)
    if (empty($data['whatsapp']) || empty($data['nome_completo'])) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Nome e WhatsApp são obrigatórios."]);
        exit();
    }

    $mail = new PHPMailer(true);

    // Configurações do Servidor SMTP da HostGator
    $mail->isSMTP();
    $mail->CharSet    = 'UTF-8';
    $mail->Host       = 'mail.techferrari.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'audicao@techferrari.com';
    $mail->Password   = 'Naza1700'; // VOCÊ PRECISA MUDAR ISSO ANTES DE SUBIR
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // SSL
    $mail->Port       = 465;

    // Remetente
    $mail->setFrom('audicao@techferrari.com', 'Sistema de Audições');
    
    // Destinatários
    $mail->addAddress('davi-silva07@hotmail.com');
    $mail->addAddress('deboraguerradelmondes@gmail.com');
    $mail->addAddress('richard.delmondes@gmail.com');
    $mail->addAddress('pr.ricardodelmondes@outlook.com');

    // Mapeamento de booleanos para "Sim/Não"
    $batizado = !empty($data['batizado']) && $data['batizado'] ? 'Sim' : 'Não';
    $veio_outra = !empty($data['veio_outra_igreja']) && $data['veio_outra_igreja'] ? 'Sim' : 'Não';
    $integracao = !empty($data['fez_integracao']) && $data['fez_integracao'] ? 'Sim' : 'Não';
    $ja_serviu = !empty($data['ja_serviu_antes']) && $data['ja_serviu_antes'] ? 'Sim' : 'Não';

    // Conteúdo da Inscrição (PlainText e HTML simples)
    $mail->isHTML(false);
    $mail->Subject = 'Nova Inscrição de Audição - ' . $data['nome_completo'];

    $mensagem = "NOVA INSCRIÇÃO RECEBIDA - TABERNÁCULO MUSIC\n";
    $mensagem .= "===============================================\n\n";
    $mensagem .= "DADOS PESSOAIS:\n";
    $mensagem .= "- Nome Completo: " . ($data['nome_completo'] ?? 'N/A') . "\n";
    $mensagem .= "- Idade: " . ($data['idade'] ?? 'N/A') . "\n";
    $mensagem .= "- Estado Civil: " . ($data['estado_civil'] ?? 'N/A') . "\n";
    $mensagem .= "- WhatsApp: " . ($data['whatsapp'] ?? 'N/A') . "\n\n";
    
    $mensagem .= "INFORMAÇÕES ESPIRITUAIS:\n";
    $mensagem .= "- Tempo de Igreja: " . ($data['tempo_igreja'] ?? 'N/A') . "\n";
    $mensagem .= "- Batizado nas águas? " . $batizado . "\n";
    $mensagem .= "- Veio de outra igreja? " . $veio_outra . "\n";
    if ($veio_outra == 'Sim') {
        $mensagem .= "- Fez o curso de Integração? " . $integracao . "\n";
    }
    $mensagem .= "\n";
    
    $mensagem .= "INFORMAÇÕES MUSICAIS:\n";
    $mensagem .= "- Área de Atuação: " . ($data['area_atuacao'] ?? 'N/A') . "\n";
    if (!empty($data['instrumento_funcao'])) {
         $mensagem .= "- Instrumento/Função: " . $data['instrumento_funcao'] . "\n";
    }
    $mensagem .= "- Tempo de Experiência: " . ($data['tempo_experiencia'] ?? 'N/A') . "\n";
    $mensagem .= "- Já serviu no ministério nessa área? " . $ja_serviu . "\n\n";

    $mensagem .= "AGENDAMENTO:\n";
    $mensagem .= "- Data Escolhida para a Audição: " . ($data['data_audicao'] ?? 'N/A') . "\n";

    $mail->Body = $mensagem;

    // Tentativa de envio
    $mail->send();
    
    http_response_code(200);
    echo json_encode(["status" => "success", "message" => "Inscrição enviada com sucesso!"]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Erro ao enviar e-mail. Log: {$mail->ErrorInfo}"]);
} catch (\Throwable $th) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Erro desconhecido. " . $th->getMessage()]);
}
