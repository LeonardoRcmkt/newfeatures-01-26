<?php

class WinnerService
{
    private $db;

    public function __construct(PDO $db)
    {
        $this->db = $GLOBALS["db"]();
    }

    public function getWinnersToReceive(): array
    {
        $query = $this->db->prepare("
            SELECT 
                h.id_premio_instantaneo, 
                h.id_cliente,
                h.desc_premio
            FROM 
                horarios_premios_instantaneos h 
            WHERE 
                h.premio_enviado = 0 
                AND h.premio_utilizado = 1
                AND h.data_hora_premio < DATE_FORMAT(CURDATE(), '%Y-%m-%d 00:00:00')
            ORDER BY 
                h.data_hora_premio DESC
            LIMIT 100;
        ");
        
        $query->execute();
        return $query->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getClientData(int $userId): ?array
    {
        $query = $this->db->prepare("
            SELECT 
                c.nome,
                c.email,
                c.numero_documento,
                c.dt_nascimento,
                c.telefone,
                c.endereco,
                c.numero_endereco,
                c.complemento,
                c.bairro,
                c.cependereco,
                c.cidade,
                c.uf
            FROM clientes c
            WHERE c.idcliente = :user_id;
        ");
        $query->bindParam(":user_id", $userId, PDO::PARAM_INT);
        $query->execute();
        return $query->fetch(PDO::FETCH_ASSOC);
    }

    public function updateParticipationStatus(int $premioInstantaneo): int
    {
        $query = $this->db->prepare("
            UPDATE 
                horarios_premios_instantaneos
            SET 
                premio_enviado = 1
            WHERE 
                id_premio_instantaneo = :premio_instantaneo;
        ");
        $query->bindParam(":premio_instantaneo", $premioInstantaneo, PDO::PARAM_INT);
        $query->execute();
        return $query->rowCount();
    }

    public function getUpdatedUserBalance($client)
    {
        $query = $this->db->prepare("
            SELECT 
                SUM(hpi.desc_premio) as total
            FROM 
                horarios_premios_instantaneos hpi
            WHERE
                hpi.id_cliente = :client
            AND 
                hpi.premio_enviado = 1
        ");

        $query->bindParam(":client", $client, PDO::PARAM_INT);
        $query->execute();
        return $query->fetch(PDO::FETCH_ASSOC);
    }

    public function logIntegrationResult(int $idPremioInstantaneo, array $result): void
    {
        $message = json_encode($result["message"]);
        $query = $this->db->prepare("
            INSERT INTO integration_logs (id_premio_instantaneo, success, response)
            VALUES (:id_premio_instantaneo, :success, :response)
        ");
        $query->bindParam(":id_premio_instantaneo", $idPremioInstantaneo, PDO::PARAM_INT);
        $query->bindParam(":success", $result["success"], PDO::PARAM_BOOL);
        $query->bindParam(":response", $message, PDO::PARAM_STR);
        $query->execute();
    }
}
