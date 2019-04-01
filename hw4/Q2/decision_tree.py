from util import entropy, information_gain, partition_classes
import numpy as np 
import ast

class DecisionTree(object):
    def __init__(self):
        # Initializing the tree as an empty dictionary or list, as preferred
        self.tree = []
        #self.tree = {}
        pass

    def learn(self, X, y):
        # TODO: Train the decision tree (self.tree) using the the sample X and labels y
        # You will have to make use of the functions in utils.py to train the tree
        
        # One possible way of implementing the tree:
        #    Each node in self.tree could be in the form of a dictionary:
        #       https://docs.python.org/2/library/stdtypes.html#mapping-types-dict
        #    For example, a non-leaf node with two children can have a 'left' key and  a 
        #    'right' key. You can add more keys which might help in classification
        #    (eg. split attribute and split value)
        max_gain = 0
        split_attribute = ''
        split_val = ''
        numcol = len(X[0])
        numrow = len(X)
        if entropy(y) != 0:  # label does not contain all 1's or all 0's
            for row in range(numrow):
                for col in range(numcol):
                    partitionedtup = partition_classes(X, y, col, X[row][col])
                    X_left = partitionedtup[0]
                    X_right = partitionedtup[1]
                    y_left = partitionedtup[2]
                    y_right = partitionedtup[3]
                    new_y = [y_left] + [y_right]
                    if information_gain(y, new_y) > max_gain:
                        max_gain = information_gain(y, new_y)
                        split_attribute = col
                        split_val = X[row][col]
                        self.learn(X_left, y_left)
                        self.learn(X_right, y_right)


    def classify(self, record):
        # TODO: classify the record using self.tree and return the predicted label
        num0 = 0
        num1 = 0
        for i in record:
            if i == 0:
                num0 += 1
            elif i == 1:
                num1 += 1
        if num0 > num1:
            return 0
        elif num1 > num0:
            return 1
        else:
            return 0
