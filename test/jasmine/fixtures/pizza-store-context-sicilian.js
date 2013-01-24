define(['src/pizza-baker',
        'src/pizza-builder',
        'src/pizza-factory',
        'src/pizza'], 
        function(baker, builder, factory, pizza) {

    baker.device = 'brick oven';
    factory.doughType = 'sicilian';

    return {
      baker: baker,
      builder: builder,
      factory: factory,
      pizza: pizza
    }

});