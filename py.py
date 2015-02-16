class Test(object):
    def __init__(self):
        self.a = dict()

    def get_a(self):
        return Test()

t = Test();
t.get_a().a = 3
print t.get_a()