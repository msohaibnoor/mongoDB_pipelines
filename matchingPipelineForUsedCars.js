module.exports.matching = (make, range, model) => {
  return [
    {
      $match: {
        make,
        range,
        model,
      },
    },
    {
      $project: {
        make: 1,
        range: 1,
        model: 1,
        bodyStyleSimplified: 1,
        dateManufactured: 1,
        annualRoadTax: 1,
        priceOrCostNew: 1,
        priceUsed: 1,
        insurance: 1,
        costToFuelUp: 1,
        fuelEconomyMPG: 1,
        luggageCapacity: 1,
        height: 1,
        weight: 1,
        seats: 1,
        doors: 1,
        fuelSimplified: 1,
        engineSize: 1,
        transmissionSimplified: 1,
        driveTrain: 1,
        co2Emissions: 1,
        power: 1,
        zeroTo62MPH: 1,
        topSpeed: 1,
        torque: 1,
        fuelRange: 1,
      },
    },
    {
      $lookup: {
        from: 'manufacturerMakes',
        let: {
          make: '$make',
          range: '$range',
          model: '$model',
          bodyStyleSimplified: '$bodyStyleSimplified',
          annualRoadTax: '$annualRoadTax',
          priceOrCostNew: '$priceOrCostNew',
          insurance: '$insurance',
          dateManufactured: '$dateManufactured',
          costToFuelUp: '$costToFuelUp',
          fuelEconomyMPG: '$fuelEconomyMPG',
          luggageCapacity: '$luggageCapacity',
          height: '$height',
          weight: '$weight',
          seats: '$seats',
          doors: '$doors',
          fuelSimplified: '$fuelSimplified',
          engineSize: '$engineSize',
          transmissionSimplified: '$transmissionSimplified',
          driveTrain: '$driveTrain',
          co2Emissions: '$co2Emissions',
          power: '$power',
          zeroTo62MPH: '$zeroTo62MPH',
          topSpeed: '$topSpeed',
          torque: '$torque',
          fuelRange: '$fuelRange',
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: ['$make', '$$make'],
                  },
                  {
                    $eq: ['$range', '$$range'],
                  },
                  {
                    $regexMatch: {
                      input: '$model',
                      regex: new RegExp(model),
                    },
                  },
                ],
              },
            },
          },
          {
            $group: {
              _id: '$model',

              id: {
                $first: '$_id',
              },
              make: {
                $first: '$make',
              },
              range: {
                $first: '$range',
              },
              registerDate: {
                $first: '$registerDate',
              },
              registerDateSimplified: {
                $first: '$registerDateSimplified',
              },
              mileageSimplified: {
                $first: '$mileageSimplified',
              },
              priceSimplified: {
                $first: '$priceSimplified',
              },
              address: {
                $first: '$address',
              },
              phoneNumber: {
                $first: '$phoneNumber',
              },
              phoneNumberSimplified: {
                $first: '$phoneNumberSimplified',
              },
              advertURL: {
                $first: '$advertURL',
              },
              doors: {
                $first: '$doors',
              },
              fuel: {
                $first: '$fuel',
              },
              image: {
                $first: '$image',
              },
            },
          },

          {
            $addFields: {
              model: '$$model',
              bodyStyleSimplified: '$$bodyStyleSimplified',
              annualRoadTax: '$$annualRoadTax',
              priceOrCostNew: '$$priceOrCostNew',
              insurance: '$$insurance',
              costToFuelUp: '$$costToFuelUp',
              dateManufactured: '$$dateManufactured',
              fuelEconomyMPG: '$$fuelEconomyMPG',
              luggageCapacity: '$$luggageCapacity',
              height: '$$height',
              weight: '$$weight',
              seats: '$$seats',
              doors: '$$doors',
              fuelSimplified: '$$fuelSimplified',
              engineSize: '$$engineSize',
              transmissionSimplified: '$$transmissionSimplified',
              driveTrain: '$$driveTrain',
              co2Emissions: '$$co2Emissions',
              power: '$$power',
              zeroTo62MPH: '$$zeroTo62MPH',
              topSpeed: '$$topSpeed',
              torque: '$$torque',
              fuelRange: '$$fuelRange',
            },
          },
        ],
        as: 'cars',
      },
    },
    {
      $unwind: {
        path: '$cars',
        preserveNullAndEmptyArrays: false,
      },
    },
    {
      $replaceRoot: {
        newRoot: '$cars',
      },
    },
  ];
};
