## Data and Visual Analytics - Homework 4
## Georgia Institute of Technology
## Applying ML algorithms to detect eye state

import numpy as np
import pandas as pd
import time

from sklearn.model_selection import cross_val_score, GridSearchCV, cross_validate, train_test_split
from sklearn.metrics import accuracy_score, classification_report
from sklearn.svm import SVC
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler, normalize
from sklearn.decomposition import PCA

######################################### Reading and Splitting the Data ###############################################
# XXX
# TODO: Read in all the data. Replace the 'xxx' with the path to the data set.
# XXX
data = pd.read_csv('eeg_dataset.csv')

# Separate out the x_data and y_data.
x_data = data.loc[:, data.columns != "y"]
y_data = data.loc[:, "y"]

# The random state to use while splitting the data.
random_state = 100

# XXX
# TODO: Split 70% of the data into training and 30% into test sets. Call them x_train, x_test, y_train and y_test.
# Use the train_test_split method in sklearn with the parameter 'shuffle' set to true and the 'random_state' set to 100.
# XXX
x_train, x_test, y_train, y_test = train_test_split(x_data, y_data, test_size=0.30, random_state=random_state)

# ############################################### Linear Regression ###################################################
# XXX
# TODO: Create a LinearRegression classifier and train it.
# XXX
print()
print("LinearRegression classifier")
lr = LinearRegression()
lr.fit(x_train, y_train)

# XXX
# TODO: Test its accuracy (on the training set) using the accuracy_score method.
# TODO: Test its accuracy (on the testing set) using the accuracy_score method.
# Note: Round the output values greater than or equal to 0.5 to 1 and those less than 0.5 to 0. You can use
# y_predict.round() or any other method.
# XXX

print("train: {}".format(accuracy_score(y_train, [round(v) for v in lr.predict(x_train)])))
print("test: {}".format(accuracy_score(y_test, [round(v) for v in lr.predict(x_test)])))

# ############################################### Random Forest Classifier #############################################
# XXX
# TODO: Create a RandomForestClassifier and train it.
# XXX
print()
print("RandomForestClassifier")
rf = RandomForestClassifier()
rf.fit(x_train, y_train)

# XXX
# TODO: Test its accuracy on the training set using the accuracy_score method.
# TODO: Test its accuracy on the test set using the accuracy_score method.
# XXX

print("train: {}".format(accuracy_score(y_train, rf.predict(x_train))))
print("test: {}".format(accuracy_score(y_test, rf.predict(x_test))))

# XXX
# TODO: Determine the feature importance as evaluated by the Random Forest Classifier.
#       Sort them in the descending order and print the feature numbers. The report the most important and the least
#       important feature.
#       Mention the features with the exact names, e.g. X11, X1, etc.
#       Hint: There is a direct function available in sklearn to achieve this. Also checkout argsort() function in
#       Python.
# XXX

f_importance = [(f, i) for i, f in zip(rf.feature_importances_, data.columns)]
f_importance = sorted(f_importance, key=lambda x: -x[1])
print(f_importance)

# XXX
# TODO: Tune the hyper-parameters 'n_estimators' and 'max_depth'.
#       Print the best params, using .best_params_, and print the best score, using .best_score_.
# XXX
grf = GridSearchCV(rf, {'n_estimators': [5, 150, 300, 450, 600, 750],
                        'max_depth': [3, 10, 14, 25, 30, 35]},
                   cv=10,
                   n_jobs=-1)
grf.fit(x_train, y_train)

print("Best param: {}\nBest train score: {}".format(grf.best_params_, grf.best_score_))
print("Best test score: {}".format(accuracy_score(y_test, grf.best_estimator_.predict(x_test))))
# ############################################ Support Vector Machine ##################################################
# XXX
# TODO: Pre-process the data to standardize or normalize it, otherwise the grid search will take much longer
# TODO: Create a SVC classifier and train it.
# XXX
print()
print("StandardScaler")

sc = StandardScaler()
sc.fit(x_train)
x_train_std = sc.transform(x_train)
x_test_std = sc.transform(x_test)

print()
print("SVC")
svc = SVC()
svc.fit(x_train_std, y_train)

# XXX
# TODO: Test its accuracy on the training set using the accuracy_score method.
# TODO: Test its accuracy on the test set using the accuracy_score method.
# XXX

print("train: {}".format(accuracy_score(y_train, svc.predict(x_train))))
print("test: {}".format(accuracy_score(y_test, svc.predict(x_test))))

# XXX
# TODO: Tune the hyper-parameters 'C' and 'kernel' (use rbf and linear).
#       Print the best params, using .best_params_, and print the best score, using .best_score_.
# XXX

gsvc = GridSearchCV(svc, {'C': [10000.0, 1000.0, 100.0, 10.0, 1.0, 0.1, 0.01, 0.001, 0.0001],
                          'kernel': ['linear', 'rbf']},
                    cv=10,
                    n_jobs=-1)
gsvc.fit(x_train_std, y_train)

print("Best param: {}\nBest train score: {}".format(gsvc.best_params_, gsvc.best_score_))
print("Best test score: {}".format(accuracy_score(y_test, gsvc.best_estimator_.predict(x_test))))
print(gsvc.cv_results_)
index_of_best = np.argmin(gsvc.cv_results_['rank_test_score'])
for k in ['mean_train_score', 'mean_test_score', 'mean_fit_time', 'rank_test_score']:
    print("{}: {}".format(k, gsvc.cv_results_[k][index_of_best]))

# ######################################### Principal Component Analysis ###############################################
# XXX
# TODO: Perform dimensionality reduction of the data using PCA.
#       Set parameters n_component to 10 and svd_solver to 'full'. Keep other parameters at their default value.
#       Print the following arrays:
#       - Percentage of variance explained by each of the selected components
#       - The singular values corresponding to each of the selected components.
# XXX
print()
print("PCA")

pca = PCA(n_components=10, svd_solver='full')
pca.fit(x_train)
print("Percentage of variance explained by each of the selected components")
print(pca.explained_variance_ratio_)
print("singular values")
print(pca.singular_values_)
