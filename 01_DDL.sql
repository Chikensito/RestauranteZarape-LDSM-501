DROP DATABASE IF EXISTS zarape;
CREATE DATABASE zarape;
USE zarape;
-- -----------------------------------------------------
-- Table estado
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS estado
(
    idEstado INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre varchar(45)
);

-- -----------------------------------------------------
-- Table ciudad
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS ciudad 
(
    idCiudad INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(129),
    idEstado INT,
    CONSTRAINT fk_ciudad_estado_idEstado FOREIGN KEY (idEstado) REFERENCES estado(idEstado)
) ;

-- -----------------------------------------------------
-- Table sucursal
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS sucursal 
(
    idSucursal    INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre        VARCHAR(65)  NOT NULL,
    latitud       VARCHAR(65)  NOT NULL DEFAULT '',
    longitud      VARCHAR(65)  NOT NULL DEFAULT '',
    foto          LONGTEXT,
    urlWeb        VARCHAR(65)  NULL DEFAULT '',
    horarios      VARCHAR(255) NULL DEFAULT '',
    calle         VARCHAR(65)  NOT NULL DEFAULT '',
    numCalle      VARCHAR(65)  NOT NULL,
    colonia       VARCHAR(65)  NOT NULL DEFAULT '',
    idCiudad      INT NOT NULL, -- No es necesario el estado, con la ciudad se puede saber.
    activo        INT NOT NULL DEFAULT 1,
    CONSTRAINT fk_sucursal_ciudad FOREIGN KEY (idCiudad) REFERENCES ciudad(idCiudad)
) ;

-- -----------------------------------------------------
-- Table persona
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS persona 
(
    idPersona INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre    VARCHAR(45) NULL,
    apellidos VARCHAR(45) NULL,
    telefono  VARCHAR(45) NULL,
    idCiudad  INT NOT NULL,
    CONSTRAINT fk_persona_ciudad FOREIGN KEY (idCiudad) REFERENCES ciudad(idCiudad)
) ;

-- -----------------------------------------------------
-- Table usuario
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS usuario 
(
    idUsuario   INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre      VARCHAR(65) NULL,
    contrasenia VARCHAR(65) NULL,
    activo      INT NOT NULL DEFAULT 1
) ;

-- -----------------------------------------------------
-- Table empleado
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS empleado 
(
    idEmpleado  INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    idSucursal  INT NOT NULL,
    idPersona   INT NOT NULL,
    idUsuario   INT NOT NULL,
    activo      INT NOT NULL DEFAULT 1,
    CONSTRAINT fk_empleado_sucursal FOREIGN KEY (idSucursal) REFERENCES sucursal (idSucursal),
    CONSTRAINT fk_empleado_persona FOREIGN KEY (idPersona) REFERENCES persona (idPersona),
    CONSTRAINT fk_empleado_usuario FOREIGN KEY (idUsuario) REFERENCES usuario (idUsuario)
 ) ;
-- -----------------------------------------------------
-- Table cliente
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS cliente 
(
    idCliente INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    idPersona INT NOT NULL,
    activo BOOLEAN NOT NULL DEFAULT 1,
    CONSTRAINT fk_cliente_persona FOREIGN KEY (idPersona) REFERENCES persona (idPersona)
) ;

-- -----------------------------------------------------
-- Table tarjeta
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS tarjeta 
(
    idTarjeta INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    titular   VARCHAR(64) NULL, -- Nombre del titular
    numero    VARCHAR(16) NOT NULL,
    yy        VARCHAR(3) NULL,
    mm        VARCHAR(3) NULL,
    cvv       VARCHAR(4) NOT NULL DEFAULT '',
    calle     VARCHAR(65) NOT NULL DEFAULT '',
    numCalle  VARCHAR(7)  NOT NULL DEFAULT '',
    colonia   VARCHAR(65) NOT NULL DEFAULT '',
    cp        VARCHAR(7) NULL,
    activo    INT NOT NULL DEFAULT 1,
    idCliente INT NOT NULL,
    idEstado  INT NOT NULL, -- La tarjeta se enlaza solo con la entidad
    CONSTRAINT fk_tarjeta_cliente FOREIGN KEY (idCliente) REFERENCES cliente (idCliente),
    CONSTRAINT fk_tarjeta_estado FOREIGN KEY (idEstado) REFERENCES estado(idEstado)    
);

-- -----------------------------------------------------
-- Table categoria
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS categoria 
(
    idCategoria INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    descripcion VARCHAR(45) NULL,
    tipo        VARCHAR(2) NULL DEFAULT 'A' COMMENT 'Puede ser A de Alimentos o B de Bebidas U OTRO',
    activo      INT NOT NULL DEFAULT 1
);

-- -----------------------------------------------------
-- Table producto
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS producto 
(
    idProducto  INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre      VARCHAR(45) NULL,
    descripcion VARCHAR(255) NULL,
    foto        LONGTEXT NULL,
    precio      DECIMAL(10,2) NULL,
    idCategoria INT NOT NULL,
    activo      INT NOT NULL DEFAULT 1,
    CONSTRAINT  fk_producto_categoria FOREIGN KEY (idCategoria) REFERENCES categoria (idCategoria)
);

CREATE TABLE alimento
(
    idAlimento  INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    idProducto  INT,
    CONSTRAINT  fk_alimento_producto FOREIGN KEY (idProducto) REFERENCES producto (idProducto)
);

CREATE TABLE bebida
(
    idBebida    INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    idProducto  INT,
    CONSTRAINT  fk_bebida_producto FOREIGN KEY (idProducto) REFERENCES producto (idProducto)
);


-- -----------------------------------------------------
-- Table combo
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS combo 
(
    idCombo INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(80) NOT NULL,
    descripcion VARCHAR(255) NULL,
    precio DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    activo INT NOT NULL DEFAULT 1
) ;

-- -----------------------------------------------------
-- Table detalle_combo
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS detalle_combo 
(    
    idDetalleCombo INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    idCombo        INT NOT NULL,
    idAlimento     INT NULL,
    idBebida       INT NULL,
    tipoComponente VARCHAR(10) NOT NULL COMMENT 'ALIMENTO o BEBIDA',
    precio         DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    CONSTRAINT     fk_detallecombo_combo FOREIGN KEY (idCombo) REFERENCES combo (idCombo),
    CONSTRAINT     fk_detallecombo_alimento FOREIGN KEY (idAlimento) REFERENCES alimento (idAlimento),
    CONSTRAINT     fk_detallecombo_bebida FOREIGN KEY (idBebida) REFERENCES bebida (idBebida)
 );

-- -----------------------------------------------------
-- Table ticket
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS ticket 
(
    idTicket    INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    ticket      VARCHAR(2) NULL DEFAULT 'S' COMMENT 'Este campo se registra si es una orden en la sucursal o si es un pedido de casa',
    fecha       DATE NULL,
    pagado      VARCHAR(2) NOT NULL DEFAULT 'N' COMMENT 'S: Si; N: No;',
    idCliente   INT NOT NULL,
    idSucursal  INT NOT NULL,
    estatus     INT NOT NULL DEFAULT 1, -- 0: Cancelado; 1: En servicio; 2: Pagado
    CONSTRAINT fk_ticket_cliente FOREIGN KEY (idCliente) REFERENCES cliente (idCliente),
    CONSTRAINT fk_ticket_sucursal FOREIGN KEY (idSucursal) REFERENCES sucursal (idSucursal)
) ;
-- -----------------------------------------------------
-- Table detalle_ticket
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS detalle_ticket 
(
    idTicket    INT NOT NULL,
    cantidad    INT NULL,
    precio      DECIMAL(10,2) NULL, -- Precio del Producto
    idCombo     INT,
    idProducto  INT,
    CONSTRAINT  fk_detalle_ticket_ticket FOREIGN KEY (idTicket) REFERENCES ticket (idTicket),
    CONSTRAINT  fk_detalle_ticket_combo FOREIGN KEY (idCombo) REFERENCES combo (idCombo),
    CONSTRAINT  fk_detalle_ticket_producto FOREIGN KEY (idProducto) REFERENCES producto (idProducto)
);

-- -----------------------------------------------------
-- Table comanda
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS comanda
(
    idComanda   INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    idTicket    INT NOT NULL,
    estatus     INT NOT NULL DEFAULT 1, -- 0: Cancelado; 
                                        -- 1: En servicio; 
                                        -- 2: Lista (se emite alarma)
                                        -- 3: Entregada    
    CONSTRAINT fk_comanda_ticket FOREIGN KEY (idTicket) REFERENCES ticket (idTicket)
);
