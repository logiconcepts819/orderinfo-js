var polmom = function(j, threek)
{
    /* Requirements:  3k <= j, k is really an integer, and j + 3k is even */

    /* moment setup */
    var moment = bigRat(0);

    if (threek == 0)
    {
        /* initializations */
        var sum_term = bigRat(0);

        /* factor setup */
        var factor = bigRat(2, j + 2).divide(bigRat(2).pow(j));

        /* sum_factor setup */
        var sum_factor = bigRat(1, j + 1);

        for (var l = 0; l <= j >> 1; l++)
        {
            /* update sum_term */
            moment = moment.add(
                sum_factor.multiply(bigRat(2).pow(j - (l << 1))));

            /* update sum_factor */
            sum_factor = sum_factor.multiply(bigRat(j - (l << 1),
                                                    j - (l << 1) - 1));
        }

        /* set final result */
        moment = moment.multiply(factor);
    }
    else
    {
        /* initializations */
        var sum_term = bigRat(0);

        /* factor setup */
        var factor = bigRat(1, j + 2).divide(bigRat(2).pow(j - threek));

        for (var i = 0; i <= threek >> 1; i++)
        {
            var pijk = (i << 1) + j - threek;

            /* term setup */
            var term = bigRat(0);

            /* sum_factor setup */
            var sum_factor = bigRat(1, pijk + 1);

            for (var l = 0; l <= pijk >> 1; l++)
            {
                /* update sum_term */
                term = term.add(sum_factor.multiply(
                    bigRat(2).pow(pijk - (l << 1))));

                /* update sum_factor */
                sum_factor = sum_factor.multiply(bigRat(pijk - (l << 1),
                                                        pijk - (l << 1) - 1));
            }

            /* update term and add it in the moment result */
            term = factor.multiply(term);
            moment = moment.add(term);

            /* update factor */
            factor = factor.multiply(bigRat(threek - (i << 1) - 1,
                                            (i + 1) << 2))
                           .multiply(bigRat(threek - (i << 1),
                                            threek - i - 1)).negate();
        }
    }

    return moment;
}
