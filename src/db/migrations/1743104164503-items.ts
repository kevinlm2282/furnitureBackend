import { MigrationInterface, QueryRunner } from 'typeorm'

export class Items1743104164503 implements MigrationInterface {
  name = 'Items1743104164503'

  public async up(queryRunner: QueryRunner): Promise<void> {
    const colors = [
      {
        name: 'Rojo',
      },
      {
        name: 'Cafe',
      },
      {
        name: 'Verde',
      },
      {
        name: 'Azul',
      },
      {
        name: 'Negro',
      },
      {
        name: 'Blanco',
      },
    ]

    let colorQuery = ''
    colors.forEach((color, index) => {
      colorQuery += `(1,now(),now(),'${color.name}')`
      if (index < colors.length - 1) {
        colorQuery += `, `
      }
    })
    await queryRunner.query(`
            INSERT INTO "color" ("status", "createdAt", "updatedAt", "name") 
            VALUES 
            ${colorQuery};
        `)
    const categories = [
      {
        name: 'Sofás',
        description: 'Sofás y sillones de distintos estilos y materiales',
      },
      {
        name: 'Mesas',
        description: 'Mesas para comedor, oficina y centro de sala',
      },
      {
        name: 'Sillas',
        description: 'Sillas para comedor, oficina y descanso',
      },
      {
        name: 'Camas',
        description: 'Camas y bases para distintos tamaños y necesidades',
      },
      {
        name: 'Almacenamiento',
        description: 'Estanterías, armarios y muebles de almacenamiento',
      },
    ]

    let categoryQuery = ''
    categories.forEach((category, index) => {
      categoryQuery += `(1, now(), now(), '${category.name}', '${category.description}')`
      if (index < categories.length - 1) {
        categoryQuery += `, `
      }
    })

    await queryRunner.query(`
            INSERT INTO "categories" ("status", "createdAt", "updatedAt", "name", "description") 
            VALUES 
            ${categoryQuery};
          `)

    const images = [
      {
        original_name: 'placeholder.png',
        format: 'png',
        uuid: 'da550afe-1e96-4ecb-8f86-645659e6d9f3',
      },
      {
        original_name: 'placeholder.png',
        format: 'png',
        uuid: 'da550afe-1e96-4ecb-8f86-645659e6d9f3',
      },
      {
        original_name: 'placeholder.png',
        format: 'png',
        uuid: 'da550afe-1e96-4ecb-8f86-645659e6d9f3',
      },
      {
        original_name: 'placeholder.png',
        format: 'png',
        uuid: 'da550afe-1e96-4ecb-8f86-645659e6d9f3',
      },
      {
        original_name: 'placeholder.png',
        format: 'png',
        uuid: 'da550afe-1e96-4ecb-8f86-645659e6d9f3',
      },
      {
        original_name: 'placeholder.png',
        format: 'png',
        uuid: 'da550afe-1e96-4ecb-8f86-645659e6d9f3',
      },
      {
        original_name: 'placeholder.png',
        format: 'png',
        uuid: 'da550afe-1e96-4ecb-8f86-645659e6d9f3',
      },
      {
        original_name: 'placeholder.png',
        format: 'png',
        uuid: 'da550afe-1e96-4ecb-8f86-645659e6d9f3',
      },
      {
        original_name: 'placeholder.png',
        format: 'png',
        uuid: 'da550afe-1e96-4ecb-8f86-645659e6d9f3',
      },
      {
        original_name: 'placeholder.png',
        format: 'png',
        uuid: 'da550afe-1e96-4ecb-8f86-645659e6d9f3',
      },
      {
        original_name: 'placeholder.png',
        format: 'png',
        uuid: 'da550afe-1e96-4ecb-8f86-645659e6d9f3',
      },
      {
        original_name: 'placeholder.png',
        format: 'png',
        uuid: 'da550afe-1e96-4ecb-8f86-645659e6d9f3',
      },
      {
        original_name: 'placeholder.png',
        format: 'png',
        uuid: 'da550afe-1e96-4ecb-8f86-645659e6d9f3',
      },
      {
        original_name: 'placeholder.png',
        format: 'png',
        uuid: 'da550afe-1e96-4ecb-8f86-645659e6d9f3',
      },
      {
        original_name: 'placeholder.png',
        format: 'png',
        uuid: 'da550afe-1e96-4ecb-8f86-645659e6d9f3',
      },
      {
        original_name: 'placeholder.png',
        format: 'png',
        uuid: 'da550afe-1e96-4ecb-8f86-645659e6d9f3',
      },
      {
        original_name: 'placeholder.png',
        format: 'png',
        uuid: 'da550afe-1e96-4ecb-8f86-645659e6d9f3',
      },
      {
        original_name: 'placeholder.png',
        format: 'png',
        uuid: 'da550afe-1e96-4ecb-8f86-645659e6d9f3',
      },
      {
        original_name: 'placeholder.png',
        format: 'png',
        uuid: 'da550afe-1e96-4ecb-8f86-645659e6d9f3',
      },
      {
        original_name: 'placeholder.png',
        format: 'png',
        uuid: 'da550afe-1e96-4ecb-8f86-645659e6d9f3',
      },
    ]

    let imageQuery = ''
    images.forEach((image, index) => {
      imageQuery += `(1, now(), now(), '${image.original_name}', '${image.format}', '${image.uuid}')`
      if (index < images.length - 1) {
        imageQuery += `, `
      }
    })

    await queryRunner.query(`
            INSERT INTO "image" ("status", "createdAt", "updatedAt", "original_name", "format", "uuid") 
            VALUES 
            ${imageQuery};
          `)

    const items = [
      {
        name: 'Sofá de Cuero',
        quantity: 3,
        sell_price: 899.99,
        fabrication_cost: 550.0,
        id_color: 1,
        id_category: 1,
        id_image: 1,
      },
      {
        name: 'Mesa de Comedor',
        quantity: 5,
        sell_price: 499.99,
        fabrication_cost: 300.0,
        id_color: 2,
        id_category: 2,
        id_image: 2,
      },
      {
        name: 'Silla de Oficina',
        quantity: 10,
        sell_price: 150.0,
        fabrication_cost: 90.0,
        id_color: 3,
        id_category: 3,
        id_image: 3,
      },
      {
        name: 'Cama King Size',
        quantity: 4,
        sell_price: 1200.0,
        fabrication_cost: 750.0,
        id_color: 4,
        id_category: 4,
        id_image: 4,
      },
      {
        name: 'Estantería Moderna',
        quantity: 8,
        sell_price: 350.0,
        fabrication_cost: 200.0,
        id_color: 5,
        id_category: 5,
        id_image: 5,
      },
      {
        name: 'Sofá Seccional',
        quantity: 2,
        sell_price: 1299.99,
        fabrication_cost: 800.0,
        id_color: 1,
        id_category: 1,
        id_image: 6,
      },
      {
        name: 'Mesa Ratona',
        quantity: 7,
        sell_price: 180.0,
        fabrication_cost: 100.0,
        id_color: 2,
        id_category: 2,
        id_image: 7,
      },
      {
        name: 'Silla de Madera',
        quantity: 15,
        sell_price: 75.0,
        fabrication_cost: 40.0,
        id_color: 3,
        id_category: 3,
        id_image: 8,
      },
      {
        name: 'Cama Individual',
        quantity: 6,
        sell_price: 450.0,
        fabrication_cost: 250.0,
        id_color: 4,
        id_category: 4,
        id_image: 9,
      },
      {
        name: 'Armario Grande',
        quantity: 5,
        sell_price: 950.0,
        fabrication_cost: 600.0,
        id_color: 5,
        id_category: 5,
        id_image: 10,
      },
      {
        name: 'Escritorio Ejecutivo',
        quantity: 4,
        sell_price: 650.0,
        fabrication_cost: 400.0,
        id_color: 1,
        id_category: 2,
        id_image: 11,
      },
      {
        name: 'Banco Alto',
        quantity: 12,
        sell_price: 120.0,
        fabrication_cost: 70.0,
        id_color: 2,
        id_category: 3,
        id_image: 12,
      },
      {
        name: 'Sofá 3 Plazas',
        quantity: 3,
        sell_price: 599.99,
        fabrication_cost: 350.0,
        id_color: 3,
        id_category: 1,
        id_image: 13,
      },
      {
        name: 'Cama Doble',
        quantity: 6,
        sell_price: 750.0,
        fabrication_cost: 500.0,
        id_color: 4,
        id_category: 4,
        id_image: 14,
      },
      {
        name: 'Set de Mesitas de Noche',
        quantity: 9,
        sell_price: 220.0,
        fabrication_cost: 120.0,
        id_color: 5,
        id_category: 5,
        id_image: 15,
      },
      {
        name: 'Mueble para TV',
        quantity: 8,
        sell_price: 320.0,
        fabrication_cost: 180.0,
        id_color: 1,
        id_category: 2,
        id_image: 16,
      },
      {
        name: 'Silla Tapizada',
        quantity: 14,
        sell_price: 199.99,
        fabrication_cost: 120.0,
        id_color: 2,
        id_category: 3,
        id_image: 17,
      },
      {
        name: 'Librero de Madera',
        quantity: 11,
        sell_price: 480.0,
        fabrication_cost: 300.0,
        id_color: 3,
        id_category: 5,
        id_image: 18,
      },
      {
        name: 'Cajonera de Roble',
        quantity: 5,
        sell_price: 350.0,
        fabrication_cost: 200.0,
        id_color: 4,
        id_category: 5,
        id_image: 19,
      },
      {
        name: 'Mesa Auxiliar',
        quantity: 13,
        sell_price: 99.99,
        fabrication_cost: 50.0,
        id_color: 5,
        id_category: 2,
        id_image: 20,
      },
    ]

    let itemQuery = ''
    items.forEach((item, index) => {
      itemQuery += `(1, now(), now(), '${item.name}', ${item.quantity}, ${item.sell_price}, ${item.fabrication_cost}, 'SEEDS', ${item.id_color}, ${item.id_category}, ${item.id_image})`
      if (index < items.length - 1) {
        itemQuery += `, `
      }
    })

    await queryRunner.query(`
            INSERT INTO "items" ("status", "createdAt", "updatedAt", "name", "quantity", "sell_price", "fabrication_cost", "user", "id_color", "id_category", "id_image") 
            VALUES 
            ${itemQuery};
          `)
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
