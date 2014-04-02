"""
Fields and methods used by the LMS and Studio.
BASICALLY CRIBBED BY @jbau from the edx-ora2 project at
https://raw.githubusercontent.com/edx/edx-ora2/master/apps/openassessment/xblock/lms_mixin.py
"""

from xblock.fields import String, Float, Scope, DateTime


class LmsCompatibilityMixin(object):
    """
    Extra fields and methods used by LMS/Studio.
    """
    # Studio the default value for this field to show this XBlock
    # in the list of "Advanced Components"
    display_name = String(
        default="SQL Injection capture-the-flag", scope=Scope.settings,
        help="Display name"
    )

    start = DateTime(
        default=None, scope=Scope.settings,
        help="ISO-8601 formatted string representing the start date of this assignment."
    )

    due = DateTime(
        default=None, scope=Scope.settings,
        help="ISO-8601 formatted string representing the due date of this assignment."
    )

    weight = Float(
        display_name="Problem Weight",
        help="Defines the number of points this problem is worth.",
        values={"min": 0, "step": .1},
        default=1.0,
        scope=Scope.settings
    )

    def has_dynamic_children(self):
        """Do we dynamically determine our children? No, we don't have any.

        The LMS wants to know this to see if it has to instantiate our module
        and query it to find the children, or whether it can just trust what's
        in the static (cheaper) children listing.
        """
        return False

    @property
    def has_score(self):
        """Are we a scored type (read: a problem). Yes.

        For LMS Progress page/grades download purposes, we're always going to
        have a score, even if it's just 0 at the start.
        """
        return True

    def max_score(self):
        """The maximum raw score of our problem.
        """
        return self.weight