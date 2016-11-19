var polmom = function(j, threek)
{
    /* Requirements:  3k <= j, k is really an integer, and j + 3k is even */

    /* moment setup */
    var moment = Fraction(0);

    if (threek == 0)
    {
        /* initializations */
        var sum_term = Fraction(0);

        /* factor setup */
        var factor = Fraction(2).div(j + 2).div(Fraction(2).pow(j));

        /* sum_factor setup */
        var sum_factor = Fraction(1).div(j + 1);

        for (var l = 0; l <= j >> 1; l++)
        {
            /* update sum_term */
            moment = moment.add(sum_factor.mul(Fraction(2).pow(j - (l << 1))));

            /* update sum_factor */
            sum_factor = sum_factor.mul(Fraction(j - (l << 1))
                                            .div(j - (l << 1) - 1));
        }

        /* set final result */
        moment = moment.mul(factor);
    }
    else
    {
        /* initializations */
        var sum_term = Fraction(0);

        /* factor setup */
        var factor = Fraction(1).div(j + 2).div(Fraction(2).pow(j - threek));

        for (var i = 0; i <= threek >> 1; i++)
        {
            var pijk = (i << 1) + j - threek;

            /* term setup */
            var term = Fraction(0);

            /* sum_factor setup */
            var sum_factor = Fraction(1).div(pijk + 1);

            for (var l = 0; l <= pijk >> 1; l++)
            {
                /* update sum_term */
                term = term.add(sum_factor.mul(
                    Fraction(2).pow(pijk - (l << 1))));

                /* update sum_factor */
                sum_factor = sum_factor.mul(Fraction(pijk - (l << 1))
                                                .div(pijk - (l << 1) - 1));
            }

            /* update term and add it in the moment result */
            term = factor.mul(term);
            moment = moment.add(term);

            /* update factor */
            factor = factor.mul(Fraction(threek - (i << 1) - 1)
                                    .div((i + 1) << 2))
                           .mul(Fraction(threek - (i << 1))
                                    .div(threek - i - 1)).neg();
        }
    }

    return moment;
}
