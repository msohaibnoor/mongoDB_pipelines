let lookup = [
  {
    $project: {
      _id: 1,
      item: 1,
      price: 1,
      quantity: 1,
    },
  },
  {
    $lookup: {
      from: 'inventory',
      let: {
        sku: '$item',
        price: '$price',
        quantity: '$quantity',
      },
      pipeline: [
        {
          $match: {
            $expr: {
              $and: [
                {
                  $eq: ['$sku', '$$sku'],
                },
              ],
            },
          },
        },
        {
          $group: {
            _id: '$_id',
            id: {
              $first: '$_id',
            },
            sku: {
              $first: '$sku',
            },
            description: {
              $first: '$description',
            },
          },
        },
        {
          $addFields: {
            price: '$$price',
            quantity: '$$quantity',
          },
        },
      ],
      as: 'inventory_docs',
    },
  },
  {
    $unwind: {
      path: '$inventory_docs',
      preserveNullAndEmptyArrays: false,
    },
  },
  {
    $replaceRoot: {
      newRoot: '$inventory_docs',
    },
  },
];
