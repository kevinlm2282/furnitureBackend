import { MigrationInterface, QueryRunner } from 'typeorm'

export class Items1743104164503 implements MigrationInterface {
  name = 'Items1743104164503'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            INSERT INTO "color" ("status", "createdAt", "updatedAt", "name") 
            VALUES 
            (1, now(), now(), 'Rojo'),
            (1, now(), now(), 'Azul'),
            (1, now(), now(), 'Verde'),
            (1, now(), now(), 'Negro'),
            (1, now(), now(), 'Blanco');
        `)

    await queryRunner.query(`
            INSERT INTO "categories" ("status", "createdAt", "updatedAt", "name", "description") 
            VALUES 
            (1, now(), now(), 'Electrónica', 'Productos electrónicos y gadgets'),
            (1, now(), now(), 'Ropa', 'Vestimenta para hombres, mujeres y niños'),
            (1, now(), now(), 'Hogar', 'Productos para el hogar y decoración'),
            (1, now(), now(), 'Deportes', 'Artículos deportivos y de fitness'),
            (1, now(), now(), 'Juguetes', 'Juguetes y juegos para niños y adultos');
        `)

    await queryRunner.query(`
            INSERT INTO "image" ("status", "createdAt", "updatedAt", "original_name", "format", "uuid") 
            VALUES 
            (1, now(), now(), 'imagen1.jpg', 'jpg', 'uuid-1234'),
            (1, now(), now(), 'imagen2.png', 'png', 'uuid-5678'),
            (1, now(), now(), 'imagen3.gif', 'gif', 'uuid-9101'),
            (1, now(), now(), 'imagen4.svg', 'svg', 'uuid-1121'),
            (1, now(), now(), 'imagen5.webp', 'webp', 'uuid-3141');
        `)

    await queryRunner.query(`
          INSERT INTO "items" ("status", "createdAt", "updatedAt", "name", "quantity", "sell_price", "fabrication_cost", "user", "id_color", "id_category", "id_image") 
          VALUES 
          (1, now(), now(), 'Camiseta Roja', 50, 19.99, 10.50, 'usuario1', 1, 2, 1),
          (1, now(), now(), 'Celular Samsung', 20, 499.99, 300.00, 'usuario2', 2, 1, 2),
          (1, now(), now(), 'Silla Gamer', 10, 150.00, 90.00, 'usuario3', 3, 3, 3),
          (1, now(), now(), 'Balón de Fútbol', 30, 25.00, 15.00, 'usuario4', 4, 4, 4),
          (1, now(), now(), 'Muñeca Barbie', 15, 35.99, 20.00, 'usuario5', 5, 5, 5),
          (1, now(), now(), 'Laptop ASUS', 5, 999.99, 700.00, 'usuario6', 1, 1, 1),
          (1, now(), now(), 'Chaqueta Negra', 25, 59.99, 30.00, 'usuario7', 2, 2, 2),
          (1, now(), now(), 'Espejo Decorativo', 8, 45.00, 20.00, 'usuario8', 3, 3, 3),
          (1, now(), now(), 'Mancuernas 10kg', 12, 75.00, 40.00, 'usuario9', 4, 4, 4),
          (1, now(), now(), 'Auto de Juguete', 40, 20.99, 12.50, 'usuario10', 5, 5, 5),
          (1, now(), now(), 'Monitor Curvo', 7, 299.99, 180.00, 'usuario11', 1, 1, 1),
          (1, now(), now(), 'Pantalón Azul', 18, 40.00, 25.00, 'usuario12', 2, 2, 2),
          (1, now(), now(), 'Sofá 3 Plazas', 3, 599.99, 350.00, 'usuario13', 3, 3, 3),
          (1, now(), now(), 'Bicicleta MTB', 6, 450.00, 250.00, 'usuario14', 4, 4, 4),
          (1, now(), now(), 'Set de Cocina', 9, 120.00, 75.00, 'usuario15', 5, 3, 5),
          (1, now(), now(), 'Reloj Inteligente', 14, 199.99, 120.00, 'usuario16', 1, 1, 1),
          (1, now(), now(), 'Vestido Blanco', 22, 89.99, 50.00, 'usuario17', 2, 2, 2),
          (1, now(), now(), 'Lámpara LED', 11, 30.00, 18.00, 'usuario18', 3, 3, 3),
          (1, now(), now(), 'Raqueta de Tenis', 5, 150.00, 90.00, 'usuario19', 4, 4, 4),
          (1, now(), now(), 'Peluche Grande', 13, 55.00, 30.00, 'usuario20', 5, 5, 5);
      `)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
